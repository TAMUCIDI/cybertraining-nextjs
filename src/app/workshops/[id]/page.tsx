export const runtime = "edge";

import { createClient } from "@/utils/supabase/server";
import DefaultLayout from "@/app/layouts/DefaultLayout";

type Params = Promise<{ id: string }>

export default async function WorkshopDetail(props: {
    params: Params
}) {
    const supabase = await createClient();
    const params = await props.params
    const id = params.id
    
    const { data: workshopDetails, error } = await supabase.from('workshops').select('title,date,description,photo_url').eq('id', id);
    if (error || !workshopDetails) {
        // 处理错误或 workshopDetails 为 null 的情况
        return <div>Cannot find workshop detail...</div>;
    }
    const workshopDetail = workshopDetails[0]
    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-5 pb-5 pl-10 pr-10">
                <article className="prose max-w-4xl">
                    <h1>{workshopDetail.title}</h1>
                    <h3>{workshopDetail.date}</h3>
                    <p>
                        {workshopDetail.description}
                    </p>
                    <figure>
                        <img
                            src={workshopDetail.photo_url}
                            alt="Profile"
                        />
                    </figure>
                </article>
            </div>
        </DefaultLayout>
    );
}