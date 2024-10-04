import DefaultLayout from "@/app/layouts/DefaultLayout";

import WebinarCard, { WebinarCardProps } from "./components/WebinarCard";

import React from "react";
import fs from 'fs';
import path from 'path';

export default async function Webinars() {
    const filePath = path.join(process.cwd(), 'src/server/content/webinars.json');
    const fileContents = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(fileContents)

    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-5 pb-5 pl-10 pr-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.webinar_list.map((webinar: WebinarCardProps, index: number) => (
                        <WebinarCard
                            key={index}
                            id={webinar.id}
                            title={webinar.title}
                            time={webinar.time}
                            speaker={webinar.speaker}
                            description={webinar.description}
                        />
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
}