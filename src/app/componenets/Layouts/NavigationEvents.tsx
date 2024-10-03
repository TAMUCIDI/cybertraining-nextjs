"use client";

import { usePathname } from "next/navigation";

export function NavigationEvents() {
    const pathname = usePathname();
    const pageTitle = pathname.split('/').pop() || 'Home';

    return (
        <div className="hero bg-neutral min-h-[50vh]">
            <div className="hero-content text-center">
                <div className="max-w-xl">
                    <h1 className="text-5xl font-bold">
                        {pageTitle}
                    </h1>
                </div>
            </div>
        </div>
    )
}