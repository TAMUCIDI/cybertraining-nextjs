import React from 'react';

interface PICardProps {
    name: string;
    email: string;
    role: string;
    affiliation: string;
}

export default function PICard({
    name,
    email,
    role,
    affiliation
}: PICardProps) {
    return (
        <div className="card bg-base-100 text-base-content w-96 shadow-xl">
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {name}
                    <div className="badge badge-info">
                        {role}
                    </div>
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