import { Suspense } from "react";

import Header from "../componenets/Header/Header";
import Footer from "../componenets/Footer/Footer";
import { NavigationEvents } from "../componenets/Layouts/NavigationEvents";

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