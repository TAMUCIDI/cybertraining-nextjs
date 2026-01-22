/**
 * PostgreSQL database connection for K3s deployment
 * This replaces the Supabase client with a native PostgreSQL connection
 */

import postgres from 'postgres';

// Create a singleton connection
let sql: ReturnType<typeof postgres> | null = null;

export function getDatabase() {
  if (sql) {
    return sql;
  }

  // Connection configuration from environment variables
  const connectionConfig = {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    database: process.env.POSTGRES_DB || 'cybertraining',
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || '',
    // Connection pool settings
    max: 10, // Maximum number of connections in pool
    idle_timeout: 20, // Close idle connections after 20 seconds
    connect_timeout: 10, // Connection timeout in seconds
  };

  sql = postgres(connectionConfig);
  
  return sql;
}

/**
 * Helper function to query notebooks
 */
export async function getNotebooks() {
  const sql = getDatabase();
  const notebooks = await sql`
    SELECT id, title, category, author, file_url, thumbnail_r2_url
    FROM notebooks
    ORDER BY created_at DESC
  `;
  return notebooks;
}

/**
 * Helper function to query workshops
 */
export async function getWorkshops() {
  const sql = getDatabase();
  const workshops = await sql`
    SELECT id, title, date, location, photo_url, description, mdx_url, schedule_json
    FROM workshops
    ORDER BY date DESC
  `;
  return workshops;
}

/**
 * Helper function to query webinars
 */
export async function getWebinars() {
  const sql = getDatabase();
  const webinars = await sql`
    SELECT id, title, date, speaker, description, thumbnail_r2_url, "youtubeId"
    FROM webinars
    ORDER BY date DESC
  `;
  return webinars;
}

/**
 * Helper function to get a single notebook by ID
 */
export async function getNotebookById(id: string) {
  const sql = getDatabase();
  const notebooks = await sql`
    SELECT id, title, category, author, file_url, thumbnail_r2_url
    FROM notebooks
    WHERE id = ${id}
    LIMIT 1
  `;
  return notebooks[0] || null;
}

/**
 * Helper function to get a single workshop by ID
 */
export async function getWorkshopById(id: string) {
  const sql = getDatabase();
  const workshops = await sql`
    SELECT id, title, date, location, photo_url, description, mdx_url, schedule_json
    FROM workshops
    WHERE id = ${id}
    LIMIT 1
  `;
  return workshops[0] || null;
}

/**
 * Helper function to get a single webinar by ID
 */
export async function getWebinarById(id: string) {
  const sql = getDatabase();
  const webinars = await sql`
    SELECT id, title, date, speaker, description, thumbnail_r2_url, "youtubeId"
    FROM webinars
    WHERE id = ${id}
    LIMIT 1
  `;
  return webinars[0] || null;
}

/**
 * Helper function to get people (PIs and Members)
 * NOTE: The people data is stored in JSON files, not in database
 * This is a placeholder for future database integration
 */
export async function getPeople() {
  // For now, people data comes from JSON files
  // If you want to move this to database, create a people table
  const { PI_List, Member_List } = await import('@/server/content/people.json');
  return {
    PI_List,
    Member_List
  };
}
