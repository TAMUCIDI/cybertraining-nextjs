"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { createBrowserClient } from "@/utils/supabase/client";
import { checkAdminSchema } from "../_lib/schema";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    const supabase = createBrowserClient();
    let active = true;

    void supabase.auth.getUser().then(async ({ data }) => {
      if (!active) return;
      if (!data.user) {
        const next = encodeURIComponent(pathname || "/admin");
        router.replace(`/admin/login?next=${next}`);
        return;
      }

      const schemaReady = await checkAdminSchema();
      if (!active) return;
      if (schemaReady) {
        const { data: profile, error } = await supabase
          .from("admin_profiles")
          .select("role")
          .eq("user_id", data.user.id)
          .maybeSingle();
        if (error || !profile) {
          setDenied(true);
          return;
        }
      }
      setReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setReady(false);
        router.replace("/admin/login");
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [pathname, router]);

  if (denied) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 px-5 text-slate-800">
        <div className="w-full max-w-md border border-slate-200 bg-white p-8 text-center shadow-lg">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-800">Access restricted</p>
          <h1 className="mt-3 text-2xl font-black text-slate-950">Your account is signed in but is not an editor.</h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Ask a Cyber-DART owner to add this account to the admin profiles table.
          </p>
          <button
            type="button"
            onClick={async () => {
              await createBrowserClient().auth.signOut();
              router.replace("/admin/login");
            }}
            className="mt-6 min-h-11 bg-red-900 px-5 text-sm font-bold text-white hover:bg-red-800"
          >
            Return to sign in
          </button>
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 text-slate-700">
        <div className="flex items-center gap-3 text-sm font-semibold">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-red-800" />
          Verifying your session…
        </div>
      </div>
    );
  }

  return children;
}
