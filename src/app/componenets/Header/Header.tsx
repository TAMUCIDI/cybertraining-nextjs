"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/about", label: "About" },
  { href: "/notebooks", label: "Modules" },
  { href: "/workshops", label: "Workshops" },
  { href: "/webinars", label: "Webinars" },
  { href: "/news", label: "News" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isTransparent
          ? "border-transparent bg-transparent text-white"
          : "border-slate-200/80 bg-white/95 text-slate-950 shadow-sm backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:h-[4.5rem] lg:px-10">
        <Link
          href="/"
          aria-label="Cyber-DART home"
          className="group flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <span
            aria-hidden="true"
            className={`grid h-9 w-9 place-items-center border transition ${
              isTransparent
                ? "border-white/40 bg-white/10"
                : "border-red-900/25 bg-red-900"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rotate-45 border ${
                isTransparent ? "border-amber-300" : "border-amber-200"
              }`}
            />
          </span>
          <span className="block text-base font-black tracking-[-0.02em] sm:text-lg">
            Cyber-DART
          </span>
        </Link>

        <nav className="hidden lg:block" aria-label="Primary navigation">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block px-4 py-3 text-base font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    isActive(item.href)
                      ? isTransparent
                        ? "text-amber-300"
                        : "text-red-800"
                      : isTransparent
                        ? "text-slate-200 hover:text-white"
                        : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative lg:hidden">
          <button
            ref={menuButtonRef}
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            className="grid h-11 w-11 place-items-center border border-current/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d={isMenuOpen ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
              />
            </svg>
          </button>
          {isMenuOpen && (
            <nav
              id="mobile-navigation"
              className="absolute right-0 top-14 w-64 border border-slate-200 bg-white p-3 text-slate-950 shadow-2xl"
              aria-label="Mobile navigation"
            >
              <ul>
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`block border-l-2 px-4 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                        isActive(item.href)
                          ? "border-red-800 bg-red-50 text-red-900"
                          : "border-transparent text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
