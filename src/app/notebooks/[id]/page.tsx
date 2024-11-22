import DefaultLayout from "@/app/layouts/DefaultLayout";

import React from "react";
import fs from 'fs';
import path from 'path';
// TODO: change layout of this page.
export default function NotebookDetail({params:{id}}:{params:{id:number}}) {
    const filePath = path.join(process.cwd(), 'src/server/content/notebooks.json');
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContents);
    const notebookDetail = data.notebook_list.find((notebook: {id: number}) => notebook.id === Number(id));

    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-10 pb-10">
                <div className="w-full max-w-4xl pt-5 pb-5">

                
                {notebookDetail && (
                    <div className="border-4 border-neutral">
                    <iframe
                        src={notebookDetail.file_path} 
                        style={{ maxWidth: '4xl', width: '100%', height: '600px' }} 
                        title="Notebook Content"
                    />
                    </div>
                )}
                </div>
            </div>
            
        </DefaultLayout>
    );
}
