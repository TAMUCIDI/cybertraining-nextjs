export const runtime = "edge";

import { createClient } from "@/utils/supabase/server";
import DefaultLayout from "@/app/layouts/DefaultLayout";

//import scheduleData from "../../../../public/content/tmp.json"

type Params = Promise<{ id: string }>

type ScheduleItem = {
    time: string;
    items: string[];
};

export default async function WorkshopDetail(props: {
    params: Params
}) {
    const supabase = await createClient();
    const params = await props.params
    const id = params.id
    
    const { data: workshopDetails, error } = await supabase.from('workshops').select('title,date,description,photo_url,schedule_json').eq('id', id);
    if (error || !workshopDetails) {
        // 处理错误或 workshopDetails 为 null 的情况
        return <div>Cannot find workshop detail...</div>;
    }
    const workshopDetail = workshopDetails[0]
    //const scheduleData = JSON.parse(workshopDetail.schedule_json);
    const scheduleData = workshopDetail.schedule_json;
    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-5 pb-5 pl-10 pr-10">
                <article className="prose max-w-4xl">
                    <h1>{workshopDetail.title}</h1>
                    <h3>{workshopDetail.date}</h3>
                    <p>
                        {workshopDetail.description}
                    </p>
                    <h2>Activity Schedule</h2>
                    <table className="table-fixed">
                        <thead>
                            <tr>
                                <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                <th className="w-3/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Activities</th>
                            </tr>
                        </thead>
                        <tbody>
                        {scheduleData.schedule.map((item: ScheduleItem, index: number) => (
                            <tr key={index}>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {item.time}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <ul>
                                    {item.items.map((subItem:string, subIndex:number) => (
                                        <li key={subIndex}>{subItem}</li>
                                    ))}
                                    </ul>
                                
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
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