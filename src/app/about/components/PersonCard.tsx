import React from 'react';

export interface PersonCardProps {
    name: string;
    email: string;
    role?: string;
    affiliation: string;
    img?: string;
}

export default function PersonCard({
    name,
    email,
    role,
    affiliation,
    img
}: PersonCardProps) {
    return (
        <div className="card bg-base-100 text-base-content w-96 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <figure>
                <img
                src={img || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                alt="Profile" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {name}
                    {role && (
                        <div className="badge badge-info">
                            {role}
                        </div>
                    )}
                </h2>
                <p>{email}</p>
                <p>{affiliation}</p>
                {/*
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">Fashion</div>
                        <div className="badge badge-outline">Products</div>
                    </div>
                */}
                
            </div>
        </div>
    );
}