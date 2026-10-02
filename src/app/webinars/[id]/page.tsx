export const runtime = "edge";

import { createClient } from "@/utils/supabase/server";
import DefaultLayout from "@/app/layouts/DefaultLayout";
import { looksLikeUuid } from "@/server/content/managedContent";
import { YouTubeEmbed } from "@next/third-parties/google";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>

export default async function WebinarDetail(props: {
    params: Params
}) {
    const supabase = await createClient();
    const params = await props.params
    const id = params.id
    let webinarDetail: Record<string, unknown> | null = null;
    const { data: slugMatch, error: slugError } = await supabase
        .from("webinars")
        .select("*")
        .eq("slug", id)
        .maybeSingle();
    if (!slugError && slugMatch) webinarDetail = slugMatch;

    if (!webinarDetail && looksLikeUuid(id)) {
        const { data: idMatch, error: idError } = await supabase
            .from("webinars")
            .select("*")
            .eq("id", id)
            .maybeSingle();
        if (!idError && idMatch) webinarDetail = idMatch;
    }

    if (!webinarDetail) notFound();

    return (
        <DefaultLayout>
            <main className="min-h-screen bg-white pb-24 pt-20 text-slate-900">
                <article className="mx-auto max-w-5xl px-6 lg:px-10">
                        <>
                            <header className="border-b border-slate-200 pb-9">
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-900">Recorded webinar</p>
                                <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{String(webinarDetail.title)}</h1>
                                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-slate-600">
                                    <span>{String(webinarDetail.date || "")}</span>
                                    <span>{String(webinarDetail.speaker || "")}</span>
                                </div>
                            </header>
                            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600">
                                {String(webinarDetail.description || "")}
                            </p>
                            <div className="mt-9 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
                                <YouTubeEmbed videoid={String(webinarDetail.youtubeId || "")} height={560} params="controls=1"/>
                            </div>
                        </>
                </article>
            </main>
        </DefaultLayout>
    );
}
