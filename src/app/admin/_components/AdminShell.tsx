"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { createBrowserClient } from "@/utils/supabase/client";

import { AdminIcon, type AdminIconName } from "./AdminIcon";

const navigation: Array<{ href: string; label: string; icon: AdminIconName }> = [
  { href: "/admin", label: "Overview", icon: "overview" },
  { href: "/admin/content/notebooks", label: "Modules", icon: "notebook" },
  { href: "/admin/content/workshops", label: "Workshops", icon: "workshop" },
  { href: "/admin/content/webinars", label: "Webinars", icon: "webinar" },
  { href: "/admin/content/people", label: "People", icon: "people" },
  { href: "/admin/content/news", label: "News", icon: "news" },
  { href: "/admin/content/pages", label: "Page text", icon: "page" },
  { href: "/admin/content/settings", label: "Site settings", icon: "settings" },
  { href: "/admin/media", label: "Media library", icon: "media" },
  { href: "/admin/revisions", label: "Revision history", icon: "history" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [email, setEmail] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const firstNavigationLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    const supabase = createBrowserClient();
    void supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email || "Editor"));
  }, []);

  useEffect(() => {
    if (!sidebarOpen) return;
    firstNavigationLinkRef.current?.focus();

    const handleDrawerKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !sidebarRef.current) return;

      const focusable = Array.from(
        sidebarRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleDrawerKeyDown);
    return () => document.removeEventListener("keydown", handleDrawerKeyDown);
  }, [sidebarOpen]);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  const signOut = async () => {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900">
      <a
        href="#admin-main"
        className="fixed left-4 top-4 z-[70] -translate-y-24 bg-white px-4 py-3 text-sm font-bold text-slate-950 shadow-lg transition focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-amber-400"
      >
        Skip to admin content
      </a>
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-slate-950/55 lg:hidden"
          onClick={() => {
            setSidebarOpen(false);
            menuButtonRef.current?.focus();
          }}
        />
      )}

      <aside
        ref={sidebarRef}
        id="admin-navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-[17.5rem] flex-col border-r border-white/10 bg-[#111827] text-slate-200 shadow-2xl transition-transform duration-200 lg:visible lg:translate-x-0 ${
          sidebarOpen ? "visible translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        <div className="flex h-[4.75rem] items-center justify-between border-b border-white/10 px-6">
          <Link href="/admin" className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">
            <span className="grid h-9 w-9 place-items-center border border-amber-300/70 bg-red-950">
              <span className="h-2.5 w-2.5 rotate-45 border border-amber-300" />
            </span>
            <span>
              <span className="block text-lg font-black tracking-tight text-white">Cyber-DART</span>
              <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Content studio</span>
            </span>
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center text-slate-300 hover:bg-white/10 hover:text-white lg:hidden"
            onClick={() => {
              setSidebarOpen(false);
              menuButtonRef.current?.focus();
            }}
          >
            <AdminIcon name="close" className="h-5 w-5" />
            <span className="sr-only">Close navigation</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Admin navigation">
          <p className="px-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500">Manage content</p>
          <ul className="mt-3 space-y-1">
            {navigation.map((item, index) => (
              <li key={item.href}>
                <Link
                  ref={index === 0 ? firstNavigationLinkRef : undefined}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`flex min-h-11 items-center gap-3 border-l-2 px-3 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${
                    isActive(item.href)
                      ? "border-amber-300 bg-white/10 text-white"
                      : "border-transparent text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <AdminIcon name={item.icon} className="h-[1.15rem] w-[1.15rem] shrink-0" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/10 p-4">
          <Link
            href="/"
            target="_blank"
            className="flex min-h-11 items-center justify-between px-3 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white"
          >
            View public site
            <AdminIcon name="external" className="h-4 w-4" />
          </Link>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[17.5rem]">
        <header className="sticky top-0 z-30 flex h-[4.75rem] items-center justify-between border-b border-slate-200 bg-white/95 px-4 shadow-sm backdrop-blur sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              ref={menuButtonRef}
              type="button"
              aria-controls="admin-navigation"
              aria-expanded={sidebarOpen}
              className="grid h-11 w-11 shrink-0 place-items-center border border-slate-200 text-slate-700 hover:border-red-800 hover:text-red-900 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <AdminIcon name="menu" className="h-5 w-5" />
              <span className="sr-only">Open navigation</span>
            </button>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">Cyber-DART administration</p>
              <p className="hidden truncate text-xs text-slate-500 sm:block">Edit, review, and publish project content</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden text-right sm:block">
              <p className="max-w-56 truncate text-sm font-semibold text-slate-800">{email}</p>
              <p className="text-xs text-slate-500">Authenticated editor</p>
            </div>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex min-h-11 items-center gap-2 border border-slate-200 px-3 text-sm font-semibold text-slate-700 hover:border-red-800 hover:bg-red-50 hover:text-red-900"
            >
              <AdminIcon name="logout" className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </header>

        <main id="admin-main" className="mx-auto max-w-[100rem] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
