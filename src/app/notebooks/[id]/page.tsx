export const runtime = "edge";
import { createClient } from "@/utils/supabase/server";
import DefaultLayout from "@/app/layouts/DefaultLayout";
import React from "react";
type Params = Promise<{ id: string }>

// TODO: change layout of this page.
export default async function NotebookDetail(props: {
    params: Params
}) {
    const supabase = await createClient();
    const params = await props.params
    const id = params.id
    const { data: notebookDetail } = await supabase.from("notebooks").select('id,title,category,author,file_url').eq('id',id)
    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-10 pb-10">
                <div className="w-full max-w-4xl pt-5 pb-5">

                {notebookDetail && (
                    <div className="border-4 border-neutral">
                    <iframe
                        src={notebookDetail[0].file_url} 
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
