import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// TODO: add thumbnail for all webinars
export interface WebinarCardProps {
    id: string;
    title: string;
    img?: string;
    time: string;
    speaker: string;
    description: string;
}

export default function WebinarCard({
    id, title, img, time, speaker, description
}: WebinarCardProps) {
    return (
        <div className="card bg-base-100 text-base-content w-96 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <Link href={`/webinars/${id}`}>
                <figure>
                    <Image
                        src={img || "/images/WebinarCardDefaultImg.jpg"}
                        alt="Webinar"
                        width={384}
                        height={256}
                        className="object-cover w-full h-64"
                    />
                </figure>
                <div className="card-body">
                    <span className="card-title text-md truncate">
                        {title}
                    </span>
                    <span className='text-sm'>
                        {time}
                    </span>
                    <span className='text-md'>
                        {speaker}
                    </span>
                    <span className='text-sm truncate'>
                        {description}
                    </span>
                    {/*
                        <YouTubeEmbed videoid={ youtubeId || 'ogfYd705cRs' } height={400} params="controls=0" />
                    */}
                </div>
            </Link>
            
        </div>
    )
}