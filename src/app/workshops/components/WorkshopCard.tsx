import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface WorkshopCardProps {
    id: string;
    title: string;
    dateLabel: string;
    location: string;
    photo?: string;
    photoAlt?: string;
    imageFit?: "cover" | "contain";
    status: "Completed" | "Upcoming";
    priority?: boolean;
}

export default function WorkshopCard({ 
    id,
    title,
    photo,
    photoAlt,
    dateLabel,
    location,
    imageFit = "cover",
    status,
    priority = false,
}: WorkshopCardProps) {
    return (
        <article className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_16px_40px_rgba(15,23,42,0.11)]">
            <Link href={`/workshops/${id}`} className="flex h-full flex-col">
                <figure className="relative h-56 overflow-hidden bg-slate-100">
                    <Image
                        src={photo || "/images/WorkshopCardDefaultImg.jpg"}
                        alt={photoAlt || `${title} workshop`}
                        fill
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={`${imageFit === "contain" ? "object-contain p-3" : "object-cover"} transition duration-500 group-hover:scale-[1.025]`}
                    />
                    <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] shadow-sm ${status === "Upcoming" ? "bg-amber-300 text-amber-950" : "bg-white/90 text-slate-700"}`}>
                        {status}
                    </span>
                </figure>
                <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-semibold leading-snug text-slate-900 transition-colors group-hover:text-red-900">
                        {title}
                    </h3>
                    <p className="mt-4 text-sm font-semibold text-red-900">
                        {dateLabel}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                        {location}
                    </p>
                    <span className="mt-auto pt-5 text-sm font-semibold text-red-900">
                        View details <span aria-hidden="true">→</span>
                    </span>
                </div>
            </Link>
        </article>
    );
}
