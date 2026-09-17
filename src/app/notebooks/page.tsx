export const runtime = "edge";
import DefaultLayout from "../layouts/DefaultLayout";

import { createClient } from "@/utils/supabase/server";
import { localNotebooks } from "@/server/content/siteUpdates";

import NotebookCard from "./components/NotebookCard";

import React from "react";

export default async function Notebooks() {
    const supabase = await createClient();
    const { data: notebookList } = await supabase.from("notebooks").select('id,title,category,author,file_url,thumbnail_r2_url')

    const notebooks = [
        ...(notebookList || []).map((notebook) => ({
            id: String(notebook.id),
            title: notebook.title,
            category: notebook.category,
            author: notebook.author,
            img: notebook.thumbnail_r2_url,
        })),
        ...localNotebooks.map((notebook) => ({
            id: notebook.id,
            title: notebook.title,
            category: notebook.category,
            author: notebook.author,
            img: notebook.thumbnailUrl,
        })),
    ].sort((a, b) =>
        Number(b.id === "port-infrastructure-resilience-coastal-hazards") -
        Number(a.id === "port-infrastructure-resilience-coastal-hazards")
    );

    return (
        <DefaultLayout>
            <main className="min-h-screen bg-white pb-24 pt-12 sm:pt-16 text-slate-900">
                <section className="mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="grid gap-8 border-b border-slate-200 pb-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center lg:gap-16">
                        <div className="max-w-3xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-900">
                                Learn by doing
                            </p>
                            <h1 className="mt-3 max-w-xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                                CyberTraining modules
                            </h1>
                            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                                Open practical tutorials for cyberinfrastructure, geospatial analytics, disaster data, and GeoAI.
                            </p>
                        </div>
                        <aside className="rounded-2xl border border-red-100 bg-[#faf7f5] p-6" aria-labelledby="platform-heading">
                            <h2 id="platform-heading" className="text-lg font-semibold tracking-tight">Ready to practice?</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Choose a platform to start your workspace.
                            </p>
                            <div className="mt-5 flex flex-col gap-3">
                                <a
                                    href="https://portal-aces.hprc.tamu.edu/pun/sys/dashboard/batch_connect/sys/jupyterlab_ctdm/session_contexts/new"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn h-auto min-h-12 w-full justify-between border-0 bg-red-900 px-5 py-3 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-900"
                                >
                                    Open in ACES <span aria-hidden="true">↗</span>
                                </a>
                                <a
                                    href="https://platform.i-guide.io/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn h-auto min-h-12 w-full justify-between border border-red-900/20 bg-white px-5 py-3 text-red-900 shadow-sm hover:border-red-900 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-900"
                                >
                                    Explore I-GUIDE Platform <span aria-hidden="true">↗</span>
                                </a>
                            </div>
                        </aside>
                    </div>
                </section>

                <section className="mx-auto mt-10 max-w-7xl px-6 lg:px-10" aria-label="CyberTraining module library">
                    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <h2 className="text-2xl font-semibold tracking-tight">Explore the modules</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600">Choose a tutorial and learn at your own pace.</p>
                        </div>
                        <p className="text-sm font-medium tabular-nums text-slate-500">
                            {notebooks.length} {notebooks.length === 1 ? "module" : "modules"}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {notebooks.map((notebook, index) => (
                        <NotebookCard
                            key={notebook.id}
                            id={notebook.id}
                            title={notebook.title}
                            author={notebook.author}
                            category={notebook.category}
                            img={notebook.img}
                            priority={index === 0}
                        />
                    ))}
                    </div>
                </section>
            </main>
        </DefaultLayout>
    )
}
