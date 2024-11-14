import React from "react";
import Link from "next/link";

export interface WorkshopCardProps {
    id: number;
    title: string;
    time: string;
    location: string;
    photo?: string;
}

export default function WorkshopCard({ 
    id,title, photo, time, location
}: WorkshopCardProps) {
    return (
        <div className="card bg-base-100 text-base-content w-96 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <Link href={`workshops/${id}`}>
                <figure>
                    <img
                        src={photo || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                        alt="Profile"/>
                </figure>
                <div className="card-body">
                    <span className="card-title text-md truncate">
                        {title}
                    </span>
                    <span className='text-sm'>
                        {time}
                    </span>
                    <span className='text-sm truncate'>
                        {location}
                    </span>
                </div>
            </Link>
        </div>
    );
}