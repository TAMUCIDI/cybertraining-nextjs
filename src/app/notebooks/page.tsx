import DefaultLayout from "../layouts/DefaultLayout";

import NotebookCard, { NotebookCardProps } from "./components/NotebookCard";

import React from "react";
import fs from 'fs';
import path from 'path';

export default async function Notebooks() {
    const filePath = path.join(process.cwd(), 'src/server/content/notebooks.json')
    const fileContents = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(fileContents)

    const NBContents = data.notebook_list
    const CategoryContents = data.module_list

    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-5 pb-5 pl-10 pr-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {NBContents.map((notebook: NotebookCardProps, index: number) => (
                        <NotebookCard
                            key={index}
                            id={notebook.id}
                            title={notebook.title}
                            author={notebook.author}
                            category={CategoryContents.find(category => category.id === notebook.category)?.title}
                        />
                    ))}
                </div>
            </div>
        </DefaultLayout>
    )
}