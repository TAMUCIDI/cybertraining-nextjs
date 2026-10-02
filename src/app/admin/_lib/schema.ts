"use client";

import { createBrowserClient } from "@/utils/supabase/client";

export async function checkAdminSchema() {
  const supabase = createBrowserClient();
  const { error } = await supabase.from("pages").select("id").limit(1);
  return !error;
}
