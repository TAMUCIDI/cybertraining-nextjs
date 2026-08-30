
import Header from "../componenets/Header/Header";
import Footer from "../componenets/Footer/Footer";

//import "../global.css";
import React from "react";

export default function HomeLayout({
    children
}:{
    children: React.ReactNode;
}) {
    return (
        <div>
            <a
                href="#main-content"
                className="fixed left-4 top-4 z-[60] -translate-y-24 bg-white px-4 py-3 font-semibold text-slate-950 shadow-lg transition focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2"
            >
                Skip to content
            </a>
            <Header/>
            {children}
            <Footer/>
        </div>
    );
}
