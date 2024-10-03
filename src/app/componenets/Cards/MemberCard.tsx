import React from "react";

interface MemberCardProps {
    name: string;
    email: string;
    affiliation: string;
}
export default function MemberCard({ name, email, affiliation }:MemberCardProps) {
    return (
        <div className="card card-side bg-base-100 text-base-content shadow-xl">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                    alt="Movie" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{email}</p>
                <p>{affiliation}</p>
            </div>
        </div>
    );
}