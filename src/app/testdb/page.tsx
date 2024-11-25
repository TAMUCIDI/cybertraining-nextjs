import { createClient } from '@/utils/supabase/server';

export default async function Countries() {
  const supabase = await createClient();
  const { data: Member_List } = await supabase.from("notebooks").select('id,title,category,author,file_url').eq('id','3d986d12-8d3b-4449-b2b8-d050685a9eff')

  return <pre>{JSON.stringify(Member_List, null, 2)}</pre>
}