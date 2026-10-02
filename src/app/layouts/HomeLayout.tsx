
import Header, { type NavigationItem } from "../componenets/Header/Header";
import Footer, { type FooterContent } from "../componenets/Footer/Footer";
import { getSiteSetting } from "@/server/content/managedContent";

//import "../global.css";
import React from "react";

export default async function HomeLayout({
    children
}:{
    children: React.ReactNode;
}) {
    const [navigation, footer] = await Promise.all([
        getSiteSetting<{ items?: NavigationItem[] }>("navigation"),
        getSiteSetting<FooterContent>("footer"),
    ]);
    return (
        <div>
            <a
                href="#main-content"
                className="fixed left-4 top-4 z-[60] -translate-y-24 bg-white px-4 py-3 font-semibold text-slate-950 shadow-lg transition focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2"
            >
                Skip to content
            </a>
            <Header navigation={navigation?.items}/>
            {children}
            <Footer content={footer}/>
        </div>
    );
}
