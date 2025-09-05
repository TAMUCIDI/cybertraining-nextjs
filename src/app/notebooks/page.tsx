export const runtime = "edge";
import DefaultLayout from "../layouts/DefaultLayout";

import { createClient } from "@/utils/supabase/server";

import NotebookCard from "./components/NotebookCard";

import React from "react";

export default async function Notebooks() {
    const supabase = await createClient();
    const { data: notebookList } = await supabase.from("notebooks").select('id,title,category,author,file_url,thumbnail_r2_url')

    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-5 pb-5 pl-10 pr-10">
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