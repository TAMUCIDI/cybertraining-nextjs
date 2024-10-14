import React from "react";

import Link from "next/link";
// TODO: change category id to a list.
export interface NotebookCardProps {
    id: number;
    title: string;
    img?: string;
    category?: number;
    author: string;
}

export default function NotebookCard({
    id, title, img, category, author
}: NotebookCardProps) {
    return (
        <div className="card bg-base-100 text-base-content w-96 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <Link href={`/notebooks/${id}`}>
                <figure>
                    <img
                    src={img || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                    alt="Profile" />
                </figure>
                <div className="card-body">
                    <span className="card-title text-md truncate">
                        {title}
                    </span>
                    {category && (
                        <div className="badge badge-info">
                            {category}
                        </div>
                    )}
                    <span className='text-md'>
                        {author}
                    </span>
                    {/*
                        <YouTubeEmbed videoid={ youtubeId || 'ogfYd705cRs' } height={400} params="controls=0" />
                    */}
                </div>
            </Link>
            
        </div>
    )
}