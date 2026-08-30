# =============================================================================
# Multi-stage Dockerfile for Next.js CyberTraining Application
# Optimized for K3s deployment with pnpm package manager
# =============================================================================

# =============================================================================
# Stage 1: Dependencies
# Install all dependencies (including devDependencies)
# =============================================================================
FROM node:18-alpine AS deps

# Install libc6-compat for better compatibility with native modules
RUN apk add --no-cache libc6-compat

# Install pnpm globally
RUN npm install -g pnpm@9.13.2

# Set working directory
WORKDIR /app

# Copy package files
# Copying these first allows Docker to cache this layer
COPY package.json pnpm-lock.yaml ./

# Install dependencies
# Uses pnpm for faster, more reliable installs
RUN pnpm install --frozen-lockfile

# =============================================================================
# Stage 2: Builder
# Build the Next.js application
# =============================================================================
FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9.13.2

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all application files
COPY . .

# Set environment variable for build
# Disables Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
# This creates the .next folder with optimized production build
RUN pnpm run build

# =============================================================================
# Stage 3: Runner
# Create final minimal image with only production files
# =============================================================================
FROM node:18-alpine AS runner

WORKDIR /app

# Set to production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
# Running as root is a security risk
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output first
# Next.js standalone mode creates minimal runtime files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy public folder (must be after standalone to ensure correct structure)
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Switch to non-root user
USER nextjs

# Expose port 3000
# This is the port Next.js will listen on
EXPOSE 3000

# Set port environment variable
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
# Runs the standalone server created during build
CMD ["node", "server.js"]
