import { getNotebookById } from '@/utils/db/postgres';

// Force dynamic rendering - no database at build time
export const dynamic = 'force-dynamic';

export default async function TestDB() {
  const notebook = await getNotebookById('3d986d12-8d3b-4449-b2b8-d050685a9eff');

  return <pre>{JSON.stringify(notebook, null, 2)}</pre>
}