
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
            <Header/>
            {children}
            <Footer/>
        </div>
    );
}