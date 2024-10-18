"use client";

import { usePathname } from "next/navigation";

export function NavigationEvents() {
    const getPageTitle = (pathname: string) => {
        const paths = pathname.split('/')
        console.log(paths);
        console.log(paths.length)
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
        <div className="hero bg-base-200 min-h-[50vh]">
            <div className="hero-content text-center">
                <div className="max-w-xl">
                    <h1 className="text-5xl font-bold text-base-content">
                        {pageTitle}
                    </h1>
                </div>
            </div>
        </div>
    )
}