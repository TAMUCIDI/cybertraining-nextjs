import { getWebinarById } from "@/utils/db/postgres";
import DefaultLayout from "@/app/layouts/DefaultLayout";
import { YouTubeEmbed } from "@next/third-parties/google";

// Force dynamic rendering - no database at build time
export const dynamic = 'force-dynamic';

type Params = Promise<{ id: string }>

export default async function WebinarDetail(props: {
    params: Params
}) {
    const params = await props.params
    const id = params.id
    const webinarDetail = await getWebinarById(id);
    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-5 pb-5 pl-10 pr-10">
                <article className="prose max-w-3xl">
                    {webinarDetail ? (
                        <>
                            <h1>{webinarDetail.title}</h1>
                            <h3>{webinarDetail.date ? new Date(webinarDetail.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</h3>
                            <h3>{webinarDetail.speaker}</h3>
                            <p>
                                {webinarDetail.description}
                            </p>
                            <YouTubeEmbed videoid={webinarDetail["youtubeId"]} height={400} params="controls=0"/>
                        </>
                    ) : (
                        <p>No webinar detail found...</p>
                    )}
                </article>
            </div>
        </DefaultLayout>
    );
}