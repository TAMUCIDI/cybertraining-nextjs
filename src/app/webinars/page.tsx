export const runtime = "edge";
import DefaultLayout from "@/app/layouts/DefaultLayout";

import { createClient } from "@/utils/supabase/server";
import WebinarCard from "./components/WebinarCard";

export default async function Webinars() {
    const supabase = await createClient();
    const { data: webinarList } = await supabase.from('webinars').select('id,title,date,speaker,description,thumbnail_r2_url') || { data: [] };
    
    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-5 pb-5 pl-10 pr-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {webinarList?.map((webinar, index: number) => (
                        <WebinarCard
                            key={index}
                            id={String(webinar.id)}
                            title={webinar.title}
                            time={webinar.date}
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