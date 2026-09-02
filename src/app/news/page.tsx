import DefaultLayout from "../layouts/DefaultLayout";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function News() {
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
                            CaGIS-National AI Computing Research Resources Workshop
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            This workshop aims to equip participants with Cyberinfrastructure (CI) and GeoAI skills to advance disaster management and sustainability. Through hands-on training, participants will develop computational skills using national AI computing resources for analyzing large-scale geospatial datasets and translating complex data into actionable scientific insights. Supported by National Science Foundation (NSF)-funded programs under award Nos. 2526748, 2519476, and 2519477.
                        </p>

                        <dl className="mt-8 grid gap-5 border-l-4 border-red-900 pl-5 sm:grid-cols-2">
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Date</dt>
                                <dd className="mt-1 font-semibold text-slate-900">September 11, 2026 · All day</dd>
                            </div>
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Location</dt>
                                <dd className="mt-1 font-semibold text-slate-900">Busch Student Center, Saint Louis University, St. Louis</dd>
                            </div>
                        </dl>

                        <p className="mt-7 text-slate-600">
                            Organized by Zhe Zhang, Shaowen Wang, Honggao Liu, and Zhenhua He.
                        </p>

                        <div className="mt-9 flex flex-wrap gap-3">
                            <a
                                href="https://cartogis.org/conferences/cagis2026/workshops/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn border-0 bg-red-900 px-6 text-white shadow-sm hover:bg-red-800"
                            >
                                Workshop information and registration
                            </a>
                            <Link
                                href="/workshops/cagis-2026-cybertraining-workshop"
                                className="btn border-slate-300 bg-white px-6 text-slate-800 hover:border-red-900 hover:bg-red-50"
                            >
                                View workshop details
                            </Link>
                        </div>
                    </div>

                    <figure className="relative min-h-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.10)] sm:min-h-[480px]">
                        <Image
                            src="/images/workshops/cagis-2026.jpg"
                            alt="CaGIS 2026 Conference in St. Louis"
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
