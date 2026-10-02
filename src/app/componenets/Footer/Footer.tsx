import Link from "next/link";

export type FooterLink = {
  href: string;
  label: string;
};

export type FooterContent = {
  copyright?: string;
  resource_links?: FooterLink[];
  organization_links?: FooterLink[];
};

const defaultResourceLinks: FooterLink[] = [
  { href: "/notebooks", label: "Modules" },
  { href: "/workshops", label: "Workshops" },
  { href: "/webinars", label: "Webinars" },
];

const defaultOrganizationLinks: FooterLink[] = [
  { href: "/about", label: "About us" },
  { href: "/news", label: "News" },
];

function validLinks(value: FooterLink[] | undefined, fallback: FooterLink[]) {
  if (!Array.isArray(value)) return fallback;
  const links = value.filter((item) =>
    item &&
    typeof item.href === "string" &&
    typeof item.label === "string" &&
    ((item.href.startsWith("/") && !item.href.startsWith("//"))
      || item.href.startsWith("https://")
      || item.href.startsWith("http://")
      || item.href.startsWith("mailto:")),
  );
  return links.length > 0 ? links : fallback;
}

export default function Footer({ content }: { content?: FooterContent | null }) {
  const year = String(new Date().getFullYear());
  const copyrightTemplate = typeof content?.copyright === "string"
    ? content.copyright
    : "Copyright © {year} Cyber-DART. All rights reserved.";
  const copyright = copyrightTemplate
    .replaceAll("{year}", year);
  const resourceLinks = validLinks(content?.resource_links, defaultResourceLinks);
  const organizationLinks = validLinks(content?.organization_links, defaultOrganizationLinks);

  return (
    <footer className="bg-slate-950 px-6 py-12 text-slate-300 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-y-8 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center md:gap-x-20 md:gap-y-0">
        <aside className="max-w-xl">
          <p className="text-sm leading-5 text-slate-400">
            {copyright}
          </p>
        </aside>
        <nav aria-label="Footer resources" className="flex flex-col gap-3 md:self-start md:text-sm">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Resources</h2>
          {resourceLinks.map((item) => (
            <Link key={`${item.href}-${item.label}`} href={item.href} className="transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4">
              {item.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="Footer organization" className="flex flex-col gap-3 md:self-start md:text-sm">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Organization</h2>
          {organizationLinks.map((item) => (
            <Link key={`${item.href}-${item.label}`} href={item.href} className="transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
