"use client";

import { usePathname } from "next/navigation";

export function NavigationEvents() {
    const getPageTitle = (pathname: string) => {
        const paths = pathname.split('/')
        switch (true) {
            case paths.length === 2 && paths.includes('about'):
                return "About"
            
            case paths.length === 2 && paths.includes('news'):
                return "News"

            case paths.length === 2 && paths.includes('notebooks'):
                return "Modules"
            case paths.length === 3 && paths.includes('notebooks'):
                return "Notebook Details"

            case paths.length === 2 && paths.includes('webinars'):
                return "Webinars"
            case paths.length === 3 && paths.includes('webinars'):
                return "Webinar Details"

            case paths.length === 2 && paths.includes('workshops'):
                return "Workshops"
            case paths.length === 3 && paths.includes('workshops'):
                return "Workshop Details"   

            case paths.includes('notebooks'):
                return 'notebook details';
            case paths.includes('webinars'):
                return 'webinar details';
            default:
                return "Tmp Title";
        }
    };
    const pathname = usePathname();
    const pageTitle = getPageTitle(pathname)
    return (
        <div className="hero min-h-[28vh] border-b border-slate-200 bg-white pt-16 text-slate-900">
            <div className="hero-content text-center">
                <div className="max-w-2xl py-10">
                    <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-red-900" aria-hidden="true" />
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        {pageTitle}
                    </h1>
                </div>
            </div>
        </div>
    )
}
