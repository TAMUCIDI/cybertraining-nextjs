import { getWorkshopById } from "@/utils/db/postgres";
import DefaultLayout from "@/app/layouts/DefaultLayout";
import Image from "next/image";

// Force dynamic rendering - no database at build time
export const dynamic = 'force-dynamic';

type Params = Promise<{ id: string }>

type ScheduleItem = {
    time: string;
    items: string[];
};

export default async function WorkshopDetail(props: {
    params: Params
}) {
    const params = await props.params
    const id = params.id
    
    const workshopDetail = await getWorkshopById(id);
    if (!workshopDetail) {
        return <div>Cannot find workshop detail...</div>;
    }
    const scheduleData = workshopDetail.schedule_json;
    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-5 pb-5 pl-10 pr-10">
                <article className="prose max-w-4xl">
                    <h1>{workshopDetail.title}</h1>
                    <h3>{workshopDetail.date ? new Date(workshopDetail.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</h3>
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
                    <figure className="relative w-full h-96">
                        <Image
                            src={workshopDetail.photo_url || "/images/WorkshopCardDefaultImg.jpg"}
                            alt="Workshop"
                            fill
                            className="object-contain"
                        />
                    </figure>
                </article>
            </div>
        </DefaultLayout>
    );
}