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
    ];

    return (
        <DefaultLayout>
            <main className="min-h-screen bg-white pb-24 pt-20 text-slate-900">
                <section className="mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="grid gap-8 border-b border-slate-200 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div className="max-w-3xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-900">
                                Learn by doing
                            </p>
                            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                                CyberTraining modules
                            </h1>
                            <p className="mt-5 text-lg leading-8 text-slate-600">
                                Open practical tutorials for cyberinfrastructure, geospatial analytics, disaster data, and GeoAI.
                            </p>
                        </div>
                        <a
                            href="https://portal-aces.hprc.tamu.edu/pun/sys/dashboard/batch_connect/sys/jupyterlab_ctdm/session_contexts/new"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn border-0 bg-red-900 px-6 text-white shadow-sm hover:bg-red-800"
                        >
                            Open in JupyterLab
                        </a>
                    </div>
                </section>

                <section className="mx-auto mt-10 max-w-7xl px-6 lg:px-10" aria-label="CyberTraining module library">
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
