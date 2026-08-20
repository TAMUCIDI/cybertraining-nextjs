import React from 'react';
import Image from 'next/image';

export interface PersonCardProps {
    name: string;
    email?: string;
    role?: string;
    affiliation: string;
    img?: string;
    profileUrl?: string;
}

export default function PersonCard({
    name,
    email,
    role,
    affiliation,
    img,
    profileUrl,
}: PersonCardProps) {
    const initials = name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_16px_40px_rgba(15,23,42,0.11)]">
            <figure className="relative flex h-72 items-center justify-center overflow-hidden bg-slate-100">
                {img ? (
                    <Image
                        src={img}
                        alt={`${name} portrait`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/30 bg-white/10 text-4xl font-bold tracking-wide text-white shadow-inner" aria-label={`${name} initials`}>
                        {initials}
                    </div>
                )}
            </figure>
            <div className="flex flex-1 flex-col p-6">
                <h2 className="flex flex-wrap items-center gap-2 text-xl font-semibold text-slate-900">
                    {name}
                    {role && (
                        <span className="rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-semibold text-red-900">
                            {role}
                        </span>
                    )}
                </h2>
                {email && <a className="mt-3 break-words text-sm text-red-900 hover:underline" href={`mailto:${email}`}>{email}</a>}
                <p className="mt-3 text-sm leading-6 text-slate-600">{affiliation}</p>
                {profileUrl && (
                    <a
                        className="mt-auto pt-5 text-sm font-semibold text-red-900 hover:underline"
                        href={profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Official profile <span aria-hidden="true">↗</span>
                    </a>
                )}
            </div>
        </article>
    );
}
