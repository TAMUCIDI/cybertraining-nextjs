#!/bin/bash
# Script to verify public folder is included in Docker image

echo "Building Docker image..."
docker build -t zhjyu11/cybertraining:test .

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful! Checking public folder contents..."
    echo ""
    
    # Run container and check public folder
    docker run --rm zhjyu11/cybertraining:test ls -la /app/public/images/
    
    echo ""
    echo "Checking if ctdm_about.png exists..."
    docker run --rm zhjyu11/cybertraining:test test -f /app/public/images/ctdm_about.png && echo "✅ ctdm_about.png EXISTS" || echo "❌ ctdm_about.png NOT FOUND"
    
    echo ""
    echo "Checking all public files..."
    docker run --rm zhjyu11/cybertraining:test find /app/public -type f | head -20
else
    echo "❌ Build failed"
    exit 1
fi
