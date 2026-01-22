import DefaultLayout from "../layouts/DefaultLayout";

import { getNotebooks } from "@/utils/db/postgres";

import NotebookCard from "./components/NotebookCard";

import React from "react";

// Force dynamic rendering - no database at build time
export const dynamic = 'force-dynamic';

export default async function Notebooks() {
    const notebookList = await getNotebooks();

    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-5 pb-5 pl-10 pr-10">
                <div className="flex justify-center mb-6">
                    <a
                        href="https://portal-aces.hprc.tamu.edu/pun/sys/dashboard/batch_connect/sys/jupyterlab_ctdm/session_contexts/new"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-info"
                    >
                        Open in JupyterLab
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notebookList?.map((notebook, index: number) => (
                        <NotebookCard
                            key={index}
                            id={String(notebook.id)}
                            title={notebook.title}
                            author={notebook.author}
                            category={notebook.category}
                            img={notebook.thumbnail_r2_url}
                        />
                    ))}
                </div>
            </div>
        </DefaultLayout>
    )
}