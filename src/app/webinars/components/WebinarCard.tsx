import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { withBasePath } from '@/utils/basePath';

// TODO: add thumbnail for all webinars
export interface WebinarCardProps {
    id: string;
    title: string;
    img?: string;
    time: string;
    speaker: string;
    description: string;
    priority?: boolean;
}

export default function WebinarCard({
    id, title, img, time, speaker, description, priority = false
}: WebinarCardProps) {
    return (
        <article className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_16px_40px_rgba(15,23,42,0.11)]">
            <Link href={`/webinars/${id}`} className="flex h-full flex-col">
                <figure className="relative h-56 overflow-hidden bg-slate-100">
                    <Image
                        src={withBasePath(img || "/images/WebinarCardDefaultImg.jpg")}
                        alt={`${title} webinar cover`}
                        fill
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.025]"
                    />
                </figure>
                <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-xl font-semibold leading-snug transition-colors group-hover:text-red-900">
                        {title}
                    </h2>
                    <p className="mt-4 text-sm font-semibold text-red-900">
                        {time}
                    </p>
                    <p className="mt-2 font-medium text-slate-800">
                        {speaker}
                    </p>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                        {description}
                    </p>
                    <span className="mt-auto pt-5 text-sm font-semibold text-red-900">Watch webinar <span aria-hidden="true">→</span></span>
                </div>
            </Link>
        </article>
    )
}
