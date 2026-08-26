export const runtime = "edge";

import DefaultLayout from "@/app/layouts/DefaultLayout";

import { createClient } from '@/utils/supabase/server';
import {
  localAdvisoryMembers,
  localProjectLeadershipMembers,
} from '@/server/content/siteUpdates';

import PersonCard from "./components/PersonCard";
// import OrgCarousel from "./components/OrgCarousel";

import React from "react";
import Image from "next/image";

export default async function About() {
  const supabase = await createClient();
  const { data: PI_List } = await supabase.from("people").select('name,email,role,affiliation,img_url').in('role', ['PI','Co-PI'])
  const { data: Member_List } = await supabase.from("people").select('name,email,affiliation,img_url').in('role', ['Member'])

  const existingLeadershipNames = new Set((PI_List || []).map((person) => person.name));
  const localLeadershipNames = new Set(localProjectLeadershipMembers.map((person) => person.name));
  const existingMemberNames = new Set(
    (Member_List || [])
      .filter((person) => !localLeadershipNames.has(person.name))
      .map((person) => person.name),
  );
  const leadershipMembers = [
    ...(PI_List || []).map((person) => ({
      name: person.name,
      email: person.email,
      affiliation: person.affiliation,
      img: person.img_url,
      displayRole: person.role,
      profileUrl: undefined,
    })),
    ...localProjectLeadershipMembers
      .filter((person) => !existingLeadershipNames.has(person.name))
      .map((person) => ({
        name: person.name,
        email: undefined,
        affiliation: person.affiliation,
        img: person.img,
        displayRole: person.displayRole,
        profileUrl: person.profileUrl,
      })),
  ];
  const advisoryMembers = [
    ...(Member_List || [])
      .filter((person) => !localLeadershipNames.has(person.name))
      .map((person) => ({
        name: person.name,
        email: person.email,
        affiliation: person.affiliation,
        img: person.img_url,
        displayRole: undefined,
        profileUrl: undefined,
      })),
    ...localAdvisoryMembers
      .filter((person) => !existingMemberNames.has(person.name))
      .map((person) => ({
        name: person.name,
        email: undefined,
        affiliation: person.affiliation,
        img: person.img,
        displayRole: person.displayRole,
        profileUrl: person.profileUrl,
      })),
  ];

  return (
    <DefaultLayout>
      <main className="min-h-screen bg-white pb-24 pt-20 text-slate-900">
        <section className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-900">
              Our mission
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Building cyberinfrastructure capacity for disaster management
            </h1>
            <div className="mt-7 space-y-5 text-base leading-7 text-slate-600">
              <p>
                Disasters are global challenges that can threaten multiple communities at once. Across mitigation, preparedness, response, and recovery, geospatial big data and advanced computing can help researchers build clearer vulnerability assessments and timely situational awareness.
              </p>
              <p>
                Advanced cyberinfrastructure resources are increasingly available, yet awareness, access, and technical readiness remain real barriers. Researchers may not know which resources exist or how those capabilities can support work in their own fields.
              </p>
              <p>
                The International CyberTraining for Disaster Management network brings together students, scientists, faculty, cyberinfrastructure contributors, and users. Through practical training in advanced computing, geospatial analytics, and GeoAI, the project helps participants develop the skills needed to observe, analyze, and manage disaster events.
              </p>
            </div>
          </div>

          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
            <Image
              src="/images/ctdm_about.png"
              alt="CyberTraining for Disaster Management network diagram"
              width={800}
              height={600}
              priority
              className="h-auto w-full rounded-xl"
            />
          </figure>
        </section>

        <section className="mx-auto mt-20 max-w-7xl border-t border-slate-200 px-6 pt-14 lg:px-10" aria-labelledby="project-leadership">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-900">Project leadership</p>
            <h2 id="project-leadership" className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Meet the team</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              The project leadership connects geospatial science, high-performance computing, and interdisciplinary training.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {leadershipMembers.map((person) => (
              <PersonCard
                key={person.name}
                name={person.name}
                email={person.email}
                role={person.displayRole}
                affiliation={person.affiliation}
                img={person.img}
                profileUrl={person.profileUrl}
              />
            ))}
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-7xl border-t border-slate-200 px-6 pt-14 lg:px-10" aria-labelledby="advisory-board">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-900">Guidance and evaluation</p>
            <h2 id="advisory-board" className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Advisory Board Members</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              An international group of researchers and practitioners helps guide the network across geospatial science, computing, resilience, and education.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {advisoryMembers.map((person) => (
              <PersonCard
                key={person.name}
                name={person.name}
                email={person.email}
                role={person.displayRole}
                affiliation={person.affiliation}
                img={person.img}
                profileUrl={person.profileUrl}
              />
            ))}
          </div>
        </section>
      </main>
    </DefaultLayout>
  );
}
