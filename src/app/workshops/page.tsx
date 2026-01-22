import DefaultLayout from '@/app/layouts/DefaultLayout';

import { getWorkshops } from '@/utils/db/postgres';
import WorkshopCard from './components/WorkshopCard';

// Force dynamic rendering - no database at build time
export const dynamic = 'force-dynamic';

export default async function Workshops() {
    
    const workshopList = await getWorkshops();

    const validWorkshopList = workshopList || [];

    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-5 pb-5 pl-10 pr-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {validWorkshopList.map((workshop, index: number) => (
                        <WorkshopCard 
                            key={index}
                            id={String(workshop.id)}
                            title={workshop.title}
                            time={workshop.date}
                            location={workshop.location}
                            photo={workshop.photo_url}
                        />
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
}