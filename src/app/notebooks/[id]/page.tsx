export const runtime = "edge";

import { notFound } from "next/navigation";

import DefaultLayout from "@/app/layouts/DefaultLayout";
import { getLocalNotebook } from "@/server/content/siteUpdates";
import { createClient } from "@/utils/supabase/server";

type Params = Promise<{ id: string }>;

type NotebookDetailData = {
    title: string;
    category?: string;
    author?: string;
    fileUrl: string;
};

export default async function NotebookDetail({ params }: { params: Params }) {
    const { id } = await params;
    const localNotebook = getLocalNotebook(id);

    let notebook: NotebookDetailData | null = localNotebook
        ? {
            title: localNotebook.title,
            category: localNotebook.category,
            author: localNotebook.author,
            fileUrl: localNotebook.fileUrl,
        }
        : null;

    if (!notebook) {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("notebooks")
            .select("title,category,author,file_url")
            .eq("id", id)
            .maybeSingle();

        if (!error && data) {
            notebook = {
                title: data.title,
                category: data.category,
                author: data.author,
                fileUrl: data.file_url,
            };
        }
    }

    if (!notebook) {
        notFound();
    }

    return (
        <DefaultLayout>
            <main className="min-h-screen bg-white pb-24 pt-20 text-slate-900">
                <article className="mx-auto max-w-7xl px-6 lg:px-10">
                    <header className="mb-10 border-b border-slate-200 pb-8">
                        {notebook.category && (
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-900">
                                {notebook.category}
                            </p>
                        )}
                        <h1 className="mt-2 max-w-5xl text-3xl font-bold leading-tight sm:text-4xl">
                            {notebook.title}
                        </h1>
                        {notebook.author && (
                            <p className="mt-3 text-base text-slate-600">{notebook.author}</p>
                        )}
                    </header>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
                        <iframe
                            src={notebook.fileUrl}
                            className="h-[78vh] min-h-[720px] w-full"
                            title={`${notebook.title} content`}
                        />
                    </div>
                    <div className="mt-5 flex justify-end">
                        <a
                            href={notebook.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn border-0 bg-red-900 text-white shadow-sm hover:bg-red-800"
                        >
                            Open in a new tab
                        </a>
                    </div>
                </article>
            </main>
        </DefaultLayout>
    );
}
