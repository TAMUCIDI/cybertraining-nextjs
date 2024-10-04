import DefaultLayout from "@/app/layouts/DefaultLayout";
import { YouTubeEmbed } from "@next/third-parties/google";

import React from "react";
import fs from 'fs';
import path from 'path';

export default function WebinarDetail({params:{id}}:{params:{id:number}}) {
    const filePath = path.join(process.cwd(), 'src/server/content/webinars.json');
    const fileContents = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(fileContents)
    const webinarDetail = data.webinar_list.find((webinar) => webinar.id===Number(id));


    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-5 pb-5 pl-10 pr-10">
                <article className="prose">
                    <h1>{webinarDetail.title}</h1>
                    <span>{webinarDetail.time}</span>
                    <span>{webinarDetail.speaker}</span>
                    <p>
                        {webinarDetail.description}
                    </p>
                    <YouTubeEmbed videoid={webinarDetail.youtubeId} height={400} params="controls=0"/>
                </article>
            </div>
        </DefaultLayout>
    );
}