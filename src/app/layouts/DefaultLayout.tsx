import { Suspense } from "react";

import Header, { type NavigationItem } from "../componenets/Header/Header";
import Footer, { type FooterContent } from "../componenets/Footer/Footer";
import { NavigationEvents } from "./componenets/NavigationEvents";
import { getSiteSetting } from "@/server/content/managedContent";

//import "../global.css"
import React from "react";

export default async function DefaultLayout(
    {
        children
    }: {
        children: React.ReactNode;
    }
) {
    const [navigation, footer] = await Promise.all([
        getSiteSetting<{ items?: NavigationItem[] }>("navigation"),
        getSiteSetting<FooterContent>("footer"),
    ]);
    return (
        <div>
            <Header navigation={navigation?.items}/>
            <Suspense fallback={null}>
                <NavigationEvents/>
            </Suspense>
            { children }
            <Footer content={footer}/>
        </div>
    )
}
