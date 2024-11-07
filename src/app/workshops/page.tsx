import DefaultLayout from '@/app/layouts/DefaultLayout';

import WorkshopCard, { WorkshopCardProps } from './components/WorkshopCard';

import React from 'react';
import fs from 'fs';
import path from 'path';

export default async function Workshops() {
    const filePath = path.join(process.cwd(), 'src/server/content/workshops.json');
    const fileContents = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(fileContents)

    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-5 pb-5 pl-10 pr-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.workshop_list.map((workshop:WorkshopCardProps, index: number) => (
                        <WorkshopCard 
                            key={index}
                            id={workshop.id}
                            title={workshop.title}
                            time={workshop.time}
                            description={workshop.description}      
                        />
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
}