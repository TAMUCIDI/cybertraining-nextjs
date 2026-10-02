"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useState } from "react";

import { createBrowserClient } from "@/utils/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const supabase = createBrowserClient();
    void supabase.auth.getUser().then(({ data }) => {
      if (data.user) router.replace("/admin");
    });
  }, [router]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const supabase = createBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setSubmitting(false);
      return;
    }

    const next = searchParams.get("next");
    router.replace(next?.startsWith("/admin") ? next : "/admin");
    router.refresh();
  };

  return (
    <div className="grid min-h-screen bg-slate-950 lg:grid-cols-[0.92fr_1.08fr]">
      <section className="relative hidden overflow-hidden border-r border-white/10 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.18),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(127,29,29,0.45),transparent_42%)]" />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <Link href="/" className="relative flex items-center gap-3 font-black tracking-tight">
          <span className="grid h-10 w-10 place-items-center border border-amber-300/70 bg-red-950">
            <span className="h-3 w-3 rotate-45 border border-amber-300" />
          </span>
          Cyber-DART
        </Link>
        <div className="relative max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">Content studio</p>
          <h1 className="mt-5 text-5xl font-black leading-[1.04] tracking-[-0.045em]">
            Keep every module, event, and story current.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
            One protected workspace for Cyber-DART learning materials, workshops, people, news, page text, and media.
          </p>
        </div>
        <p className="relative text-xs leading-6 text-slate-500">
          Access is limited to invited project editors.
        </p>
      </section>

      <main className="grid min-h-screen place-items-center bg-[#f6f7fb] px-5 py-12 sm:px-8">
        <div className="w-full max-w-md border border-slate-200 bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.12)] sm:p-10">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-3 font-black tracking-tight text-slate-950">
              <span className="grid h-9 w-9 place-items-center bg-red-950">
                <span className="h-2.5 w-2.5 rotate-45 border border-amber-300" />
              </span>
              Cyber-DART
            </Link>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-red-800">Admin access</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Sign in to continue</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Use the email and password for your invited Supabase editor account.
          </p>

          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-800">Email address</span>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="min-h-12 w-full border border-slate-300 bg-white px-4 text-slate-950 outline-none transition focus:border-red-800 focus:ring-2 focus:ring-red-800/15"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-800">Password</span>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="min-h-12 w-full border border-slate-300 bg-white px-4 text-slate-950 outline-none transition focus:border-red-800 focus:ring-2 focus:ring-red-800/15"
              />
            </label>

            {error && (
              <div role="alert" className="border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm leading-6 text-red-900">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-12 w-full items-center justify-center bg-red-900 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-7 border-t border-slate-200 pt-6 text-xs leading-5 text-slate-500">
            Need access? Ask a Cyber-DART owner to invite your account and assign an admin profile.
          </p>
        </div>
      </main>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <LoginForm />
    </Suspense>
  );
}
