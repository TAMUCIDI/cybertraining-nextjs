import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 px-6 py-14 text-slate-300 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_0.6fr_0.6fr]">
        <aside className="max-w-xl">
          <Link href="/" className="text-2xl font-bold tracking-tight text-white">CyberTraining</Link>
          <p className="mt-4 max-w-md leading-7 text-slate-400">
            An international training network advancing cyberinfrastructure, geospatial science, and GeoAI for disaster management.
          </p>
          <p className="mt-8 text-sm text-slate-500">
            Copyright © {new Date().getFullYear()} CyberTraining. All rights reserved.
          </p>
        </aside>
        <nav className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Resources</h2>
          <Link href="/notebooks" className="hover:text-white">Modules</Link>
          <Link href="/workshops" className="hover:text-white">Workshops</Link>
          <Link href="/webinars" className="hover:text-white">Webinars</Link>
        </nav>
        <nav className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Organization</h2>
          <Link href="/about" className="hover:text-white">About us</Link>
          <Link href="/news" className="hover:text-white">News</Link>
        </nav>
      </div>
    </footer>
  );
}
