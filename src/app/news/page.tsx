import DefaultLayout from "../layouts/DefaultLayout";

import React from "react";
import Link from "next/link";

export default function News() {
    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-5 pb-5 pl-10 pr-10">
                <article className="prose max-w-3xl">
                    <h1>Call for Partnership</h1>
                    <p>
                        The project will provide a $2000 seed grant for new U.S. collaborators. The selected collaborators will: 
                    </p>
                    <ul>
                        <li>
                        Develop a two-hour lesson using Jupyter Notebook based on his/her previous project during a six-month time period. 
                        </li>
                        <li>
                        The project is required to use geospatial data and models to solve real-world disaster management applications.  
                        </li>
                        <li>
                        The project must use nationally recognized cyberinfrastructure resources to process and analyze big geospatial disaster data.
                        </li>
                    </ul>
                    <p>
                        If you want to join us, please fill out the <Link href="https://forms.gle/84rYB11kdjQEb6G27">Google Form</Link>
                    </p>
                </article>
            </div>
        </DefaultLayout>
    );
}