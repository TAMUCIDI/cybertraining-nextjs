import DefaultLayout from "../layouts/DefaultLayout";

import React from "react";

export default function News() {
    return (
        <DefaultLayout>
            <div className="bg-base-200 flex flex-col justify-center items-center pt-5 pb-5 pl-10 pr-10">
                <article className="prose max-w-3xl">
                    <h1>You're Invited! Join Us at the 2025 AGU Town Hall</h1>
                    <h2>CyberTraining: Broadening Adoption of Cyberinfrastructure and Geospatial Science for Disaster Management</h2>
                    <p>
                        We are excited to announce our upcoming AGU Town Hall focused on advancing cyberinfrastructure and geospatial data science research to build a more resilient disaster management workforce. This Town Hall will highlight our NSF-funded CyberTraining projects and bring together researchers, educators, and practitioners dedicated to capacity building, cyberinfrastructure innovation, and GeoAI for disaster management.
                    </p>
                    <h3>📅 Date & Time:</h3>
                    <p>
                        Tuesday, 16 December 2025 | 13:00 – 14:00 CST
                    </p>
                    <h3>📍 Location:</h3>
                    <p>
                        New Orleans Ernest N. Morial Convention Center (NOLA CC)<br />
                        Room: 267–268<br />
                        Final Session #: TH23A
                    </p>
                    <p>
                        Our project is supported by the National Science Foundation – Training-based Workforce Development for Advanced Cyberinfrastructure Program (Awards #2321069 and #2519476).
                    </p>
                    <p>
                        We look forward to seeing you in New Orleans!
                    </p>
                </article>
            </div>
        </DefaultLayout>
    );
}