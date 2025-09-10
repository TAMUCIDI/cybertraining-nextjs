import { Suspense } from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { NavigationEvents } from "./navigation/NavigationEvents";

//import "../global.css"
import React from "react";

export default function DefaultLayout(
    {
        children
    }: {
        children: React.ReactNode;
    }
) {
    return (
        <div>
            <Header/>
            <Suspense fallback={null}>
                <NavigationEvents/>
            </Suspense>
            { children }
            <Footer/>
        </div>
    )
}