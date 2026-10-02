import Link from "next/link";

import { AdminIcon } from "./AdminIcon";

type PageHeadingProps = {
  eyebrow?: string;
  title: string;
  description: string;
  action?: {
    href: string;
    label: string;
  };
};

export default function PageHeading({ eyebrow, title, description, action }: PageHeadingProps) {
  return (
    <div className="mb-7 flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-800">{eyebrow}</p>}
        <h1 className="mt-2 text-3xl font-black tracking-[-0.03em] text-slate-950 sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
      </div>
      {action && (
        <Link
          href={action.href}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 bg-red-900 px-5 text-sm font-bold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-900"
        >
          <AdminIcon name="plus" className="h-4 w-4" />
          {action.label}
        </Link>
      )}
    </div>
  );
}
