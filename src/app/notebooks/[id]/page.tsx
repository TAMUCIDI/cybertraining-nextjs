import { getNotebookById } from "@/utils/db/postgres";
import DefaultLayout from "@/app/layouts/DefaultLayout";
import React from "react";

// Force dynamic rendering - no database at build time
export const dynamic = 'force-dynamic';

type Params = Promise<{ id: string }>

// TODO: change layout of this page.
export default async function NotebookDetail(props: {
    params: Params
}) {
    const params = await props.params
    const id = params.id
    const notebookDetail = await getNotebookById(id);
    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-10 pb-10">
                <div className="w-full max-w-6xl pt-5 pb-5">

                {notebookDetail && (
                    <div className="border-4 border-neutral">
                    <iframe
                        src={notebookDetail.file_url} 
                        style={{ maxWidth: '6xl', width: '100%', height: '800px' }} 
                        title="Notebook Content"
                    />
                    </div>
                )}
                </div>
            </div>
            
        </DefaultLayout>
    );
}
