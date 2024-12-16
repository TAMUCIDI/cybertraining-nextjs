export const runtime = "edge";

import DefaultLayout from "@/app/layouts/DefaultLayout";

import { createClient } from '@/utils/supabase/server';

import PersonCard from "./components/PersonCard";
// import OrgCarousel from "./components/OrgCarousel";

import React from "react";

export default async function About() {
  const supabase = await createClient();
  const { data: PI_List } = await supabase.from("people").select('name,email,role,affiliation,img_url').in('role', ['PI','Co-PI'])
  const { data: Member_List } = await supabase.from("people").select('name,email,affiliation,img_url').in('role', ['Member'])

  return (
    <DefaultLayout>
      <div>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-5xl">
              <h1 className="pb-5 text-5xl font-bold text-base-content text-left">Vision</h1>
              <p className="py-2 text-base-content text-left">
                Disasters are defined as prominent global issues which simultaneously pose a threat to multiple countries or regions around the globe. In these public emergencies, the disaster management communities have played a vital role in saving the economy and helping people to respond and recover from the disasters. Disaster management contains mitigation, preparedness, response, and recovery phases, and each phase is gradually empowered by growing geospatial big data awareness and surging computing capabilities to produce spatial vulnerability and situational picture for supporting timely decisions. 
              </p>
              <p className="py-2 text-base-content text-left">
              The National Science Foundation (NSF) recently announced several awards through the Advanced Cyberinfrastructure (CI) Coordination Ecosystem: Services & Support (ACCESS) program to ensure the broad availability and innovative use of the CI ecosystem that can drive transformative discoveries in all areas of research and education. Despite the growing availability of advanced CI resources, there are still significant barriers that limit broad and equitable access to the ecosystem, especially for individuals and institutions that are resource-constrained and communities that have been traditionally underrepresented. Many researchers are not aware of the available CI resources or may not understand what these resources are capable of in their fields of expertise.
              </p>
              <p className="py-2 text-base-content text-left">
                This project aims to establish an International CyberTraining for Disaster Management (CTDM) network in which disaster management research communities (undergraduate/graduate students, scientists, and faculty members) can broaden their computational and cyberinfrastructure skills by participating in our CTDM training program. This project targets CI contributors and CI users with a research focus on applying CI and geospatial analytics in disaster management across Geoscience, Public Health, Engineering, Transportation, Social, Behavioral, and Economic Sciences. Through our training program, the CI users and contributors can gain CI and geospatial analytic skills to build new CI capabilities for observing, monitoring, and managing disaster events. This project also provides them with a level of core literacy so they can develop new computational skills in analyzing extensive disaster data to produce scientific outcomes.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-base-200 flex flex-col justify-center items-center pt-5 pb-5 pl-10 pr-10">
          {/* Team Title */}
          <div className="hero-content text-center pb-5">
            <div className="max-w-4xl">
              <h2 className="text-4xl font-bold text-base-content">
                Meet the team
              </h2>
            </div>
          </div>
          {/* PI Card List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PI_List?.map((person, index: number) => (
              <PersonCard
                key={index}
                name={person.name}
                email={person.email}
                role={person.role}
                affiliation={person.affiliation}
                img={person.img_url}
              />
            ))}
          </div>
          {/* Member Title */}
          <div className="hero-content text-center">
            <div className="max-w-4xl pb-5 pt-5">
              <h2 className="text-4xl font-bold text-base-content">
                Advisory Board Members
              </h2>
            </div>
          </div>
          {/* Member Card List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Member_List?.map((person, index: number) => (
              <PersonCard
                key={index}
                name={person.name}
                email={person.email}
                affiliation={person.affiliation}
                img={person.img_url}
              />
            ))}
          </div>
        </div>
        
        {/* Org Image Carousel */}
        {/* TODO: Make sure the logo permission rules for all schools. Before that, comment this part out.
        <div className="bg-base-200 flex justify-center items-center pt-5 pb-5 pl-10 pr-10">
          <OrgCarousel/>
        </div>
        */}
      </div>
    </DefaultLayout>
  );
}
