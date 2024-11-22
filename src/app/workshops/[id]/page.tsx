import DefaultLayout from "@/app/layouts/DefaultLayout";

import React from "react";
import fs from 'fs';
import path from 'path';

// import dynamic from 'next/dynamic';

export default function WorkshopDetail({params:{id}}:{params:{id:number}}) {
    const filePath = path.join(process.cwd(), 'src/server/content/workshops.json');
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContents);
    const workshopDetail = data.workshop_list.find((workshop: { id: number }) => workshop.id === Number(id));

    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-5 pb-5 pl-10 pr-10">
                <article className="prose max-w-4xl">
                    <h1>{workshopDetail.title}</h1>
                    <h3>{workshopDetail.time}</h3>
                    <p>
                        {workshopDetail.description}
                    </p>
                    <figure>
                        <img
                            src={workshopDetail.photo}
                            alt="Profile"
                        />
                    </figure>
                </article>
            </div>
        </DefaultLayout>
    );
}