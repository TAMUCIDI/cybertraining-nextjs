export const runtime = "edge";

import { createClient } from "@/utils/supabase/server";
import DefaultLayout from "@/app/layouts/DefaultLayout";
import { YouTubeEmbed } from "@next/third-parties/google";

type Params = Promise<{ id: string }>

export default async function WebinarDetail(props: {
    params: Params
}) {
    const supabase = await createClient();
    const params = await props.params
    const id = params.id
    const { data: webinarDetails } = await supabase.from("webinars").select('title,date,speaker,description,youtubeId').eq('id',id)
    const webinarDetail = webinarDetails && webinarDetails.length > 0 ? webinarDetails[0] : null;
    return (
        <DefaultLayout>
            <main className="min-h-screen bg-white pb-24 pt-20 text-slate-900">
                <article className="mx-auto max-w-5xl px-6 lg:px-10">
                    {webinarDetail ? (
                        <>
                            <header className="border-b border-slate-200 pb-9">
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-900">Recorded webinar</p>
                                <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{webinarDetail.title}</h1>
                                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-slate-600">
                                    <span>{webinarDetail.date}</span>
                                    <span>{webinarDetail.speaker}</span>
                                </div>
                            </header>
                            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600">
                                {webinarDetail.description}
                            </p>
                            <div className="mt-9 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
                                <YouTubeEmbed videoid={webinarDetail.youtubeId} height={560} params="controls=1"/>
                            </div>
                        </>
                    ) : (
                        <p className="text-lg text-slate-600">No webinar detail found.</p>
                    )}
                </article>
            </main>
        </DefaultLayout>
    );
}
