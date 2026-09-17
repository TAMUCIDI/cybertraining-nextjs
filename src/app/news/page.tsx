import DefaultLayout from "../layouts/DefaultLayout";
import { formatWorkshopDate, getLocalWorkshop } from "@/server/content/siteUpdates";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function News() {
    const workshop = getLocalWorkshop("harvard-cga-nairr-workshop-2026")!;
    return (
        <DefaultLayout>
            <main className="min-h-screen bg-white pb-24 pt-20 text-slate-900">
                <article className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
                    <div className="max-w-3xl">
                        <span className="inline-flex rounded-full bg-amber-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-950">
                            Upcoming event
                        </span>
                        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-red-900">
                            Latest news
                        </p>
                        <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                            {workshop.title}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            {workshop.description}
                        </p>

                        <dl className="mt-8 grid gap-5 border-l-4 border-red-900 pl-5 sm:grid-cols-2">
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Date</dt>
                                <dd className="mt-1 font-semibold text-slate-900">{formatWorkshopDate(workshop.startDate, workshop.endDate)}</dd>
                            </div>
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Location</dt>
                                <dd className="mt-1 font-semibold text-slate-900">{workshop.location}</dd>
                            </div>
                        </dl>

                        <div className="mt-9 flex flex-wrap gap-3">
                            <a
                                href={workshop.registration!.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn border-0 bg-red-900 px-6 text-white shadow-sm hover:bg-red-800"
                            >
                                {workshop.registration!.label}
                            </a>
                            <Link
                                href={`/workshops/${workshop.id}`}
                                className="btn border-slate-300 bg-white px-6 text-slate-800 hover:border-red-900 hover:bg-red-50"
                            >
                                View workshop details
                            </Link>
                        </div>
                    </div>

                    <figure className="relative min-h-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.10)] sm:min-h-[480px]">
                        <Image
                            src={workshop.photoUrl!}
                            alt={workshop.photoAlt!}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 45vw"
                            className="object-contain p-8"
                        />
                    </figure>
                </article>
            </main>
        </DefaultLayout>
    );
}
