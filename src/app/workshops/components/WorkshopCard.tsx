import React from "react";
import Link from "next/link";
// TODO: Change workshop card format.
export interface WorkshopCardProps {
    id: number;
    title: string;
    time: string;
    description: string;
}

export default function WorkshopCard({ id,title }: WorkshopCardProps) {
    return (
        <div className="card bg-base-100 text-base-content">
            <Link href={`workshops/${id}`}>
                <div className="card-body">
                    <span className="card-title text-md truncate">
                        {title}
                    </span>
                </div>
            </Link>
        </div>
    );
}