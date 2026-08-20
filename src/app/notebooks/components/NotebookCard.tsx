import React from "react";

import Link from "next/link";
import Image from "next/image";
// TODO: change category id to a list.
export interface NotebookCardProps {
    id: string;
    title: string;
    img?: string;
    category?: string;
    author: string;
    priority?: boolean;
}

export default function NotebookCard({
    id, title, img, category, author, priority = false
}: NotebookCardProps) {
    return (
        <article className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_16px_40px_rgba(15,23,42,0.11)]">
            <Link href={`/notebooks/${id}`} className="flex h-full flex-col">
                <figure className="relative h-56 overflow-hidden bg-slate-100">
                    <Image
                        src={img || "/images/NotebookCardDefaultImg.jpg"}
                        alt={`${title} module cover`}
                        fill
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.025]"
                    />
                </figure>
                <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-xl font-semibold leading-snug text-slate-900 transition-colors group-hover:text-red-900">
                        {title}
                    </h2>
                    {category && (
                        <div className="mt-4 w-fit rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-semibold text-red-900">
                            {category}
                        </div>
                    )}
                    <p className="mt-4 text-sm leading-6 text-slate-600">
                        {author}
                    </p>
                    <span className="mt-auto pt-5 text-sm font-semibold text-red-900">
                        Open module <span aria-hidden="true">→</span>
                    </span>
                    {/*
                        <YouTubeEmbed videoid={ youtubeId || 'ogfYd705cRs' } height={400} params="controls=0" />
                    */}
                </div>
            </Link>
        </article>
    )
}
