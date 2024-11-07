import DefaultLayout from "@/app/layouts/DefaultLayout";

import React from "react";
import fs from 'fs';
import path from 'path';

import dynamic from 'next/dynamic';

export default function WorkshopDetail({params:{id}}:{params:{id:number}}) {
    const filePath = path.join(process.cwd(), 'src/server/content/workshops.json');
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContents);
    const workshop = data.workshop_list.find((workshop) => workshop.id === Number(id));

    if (!workshop) {
        return <div>Workshop not found</div>;
    }

    const MdxComponent = dynamic(() => import(`../../../../public/content/workshops/${workshop.mdx_path.split('/').pop()}`));

    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-5 pb-5 pl-10 pr-10">
                <MdxComponent />
            </div>
        </DefaultLayout>
    );
}