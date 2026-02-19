import DefaultLayout from "@/app/layouts/DefaultLayout";

import { getWebinars } from "@/utils/db/postgres";
import WebinarCard from "./components/WebinarCard";

// Force dynamic rendering - no database at build time
export const dynamic = 'force-dynamic';

export default async function Webinars() {
    const webinarList = await getWebinars();
    
    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-5 pb-5 pl-10 pr-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {webinarList?.map((webinar, index: number) => (
                        <WebinarCard
                            key={index}
                            id={String(webinar.id)}
                            title={webinar.title}
                            time={webinar.date ? new Date(webinar.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                            speaker={webinar.speaker}
                            description={webinar.description}
                            img={webinar.thumbnail_r2_url}
                        />
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
}