import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 px-6 py-12 text-slate-300 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-y-8 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center md:gap-x-20 md:gap-y-0">
        <aside className="max-w-xl">
          <p className="text-sm leading-5 text-slate-400">
            Copyright © {new Date().getFullYear()} Cyber-DART. All rights reserved.
          </p>
        </aside>
        <nav aria-label="Footer resources" className="flex flex-col gap-3 md:self-start md:text-sm">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Resources</h2>
          <Link href="/notebooks" className="transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4">Modules</Link>
          <Link href="/workshops" className="transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4">Workshops</Link>
          <Link href="/webinars" className="transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4">Webinars</Link>
        </nav>
        <nav aria-label="Footer organization" className="flex flex-col gap-3 md:self-start md:text-sm">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Organization</h2>
          <Link href="/about" className="transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4">About us</Link>
          <Link href="/news" className="transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4">News</Link>
        </nav>
      </div>
    </footer>
  );
}
