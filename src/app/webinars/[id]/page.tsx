export const runtime = "edge";

import { createClient } from "@/utils/supabase/server";
import DefaultLayout from "@/app/layouts/DefaultLayout";
import { YouTubeEmbed } from "@next/third-parties/google";

export default async function WebinarDetail({ params }:{ params: { id: string }}) {
    const supabase = await createClient();
    const {id} = await params;
    const { data: webinarDetails } = await supabase.from("webinars").select('title,date,speaker,description,youtubeId').eq('id',id)
    const webinarDetail = webinarDetails && webinarDetails.length > 0 ? webinarDetails[0] : null;
    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-5 pb-5 pl-10 pr-10">
                <article className="prose max-w-3xl">
                    {webinarDetail ? (
                        <>
                            <h1>{webinarDetail.title}</h1>
                            <h3>{webinarDetail.date}</h3>
                            <h3>{webinarDetail.speaker}</h3>
                            <p>
                                {webinarDetail.description}
                            </p>
                            <YouTubeEmbed videoid={webinarDetail.youtubeId} height={400} params="controls=0"/>
                        </>
                    ) : (
                        <p>No webinar detail found...</p>
                    )}
                </article>
            </div>
        </DefaultLayout>
    );
}