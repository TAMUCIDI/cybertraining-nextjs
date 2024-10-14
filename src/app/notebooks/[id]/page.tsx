import DefaultLayout from "@/app/layouts/DefaultLayout";

import React from "react";
import fs from 'fs';
import path from 'path';
// TODO: change layout of this page.
export default function NotebookDetail({params:{id}}:{params:{id:number}}) {
    const filePath = path.join(process.cwd(), 'src/server/content/notebooks.json');
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContents);
    const notebookDetail = data.notebook_list.find((notebook) => notebook.id === Number(id));

    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center">
                <div className="w-full max-w-4xl">

                
                {notebookDetail && (
                    <iframe 
                        src={notebookDetail.file_path} 
                        style={{ maxWidth: '4xl', width: '100%', height: '600px' }} 
                        title="Notebook Content"
                    />
                )}
                </div>
            </div>
            
        </DefaultLayout>
    );
}
