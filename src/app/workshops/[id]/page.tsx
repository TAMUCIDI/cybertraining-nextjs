export const runtime = "edge";

import Image from "next/image";
import { notFound } from "next/navigation";

import DefaultLayout from "@/app/layouts/DefaultLayout";
import {
    formatWorkshopDate,
    getLocalWorkshop,
    isUpcomingWorkshop,
    type WorkshopGalleryImage,
    type WorkshopResource,
    type WorkshopScheduleItem,
} from "@/server/content/siteUpdates";
import { createClient } from "@/utils/supabase/server";

type Params = Promise<{ id: string }>;

type WorkshopDetailData = {
    title: string;
    startDate: string;
    endDate?: string;
    location: string;
    description: string;
    photoUrl?: string;
    photoAlt: string;
    imageFit: "cover" | "contain";
    schedule: WorkshopScheduleItem[];
    resources: WorkshopResource[];
    gallery: WorkshopGalleryImage[];
    registration?: WorkshopResource;
};

export default async function WorkshopDetail({ params }: { params: Params }) {
    const { id } = await params;
    const localWorkshop = getLocalWorkshop(id);

    let workshop: WorkshopDetailData | null = null;

    if (localWorkshop) {
        workshop = {
            title: localWorkshop.title,
            startDate: localWorkshop.startDate,
            endDate: localWorkshop.endDate,
            location: localWorkshop.location,
            description: localWorkshop.description,
            photoUrl: localWorkshop.photoUrl,
            photoAlt: localWorkshop.photoAlt || `${localWorkshop.title} workshop`,
            imageFit: localWorkshop.imageFit || "cover",
            schedule: localWorkshop.schedule,
            resources: localWorkshop.resources || [],
            gallery: localWorkshop.gallery || [],
            registration: localWorkshop.registration,
        };
    } else {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("workshops")
            .select("title,date,location,description,photo_url,schedule_json")
            .eq("id", id)
            .maybeSingle();

        if (!error && data) {
            workshop = {
                title: data.title,
                startDate: data.date,
                location: data.location,
                description: data.description,
                photoUrl: data.photo_url,
                photoAlt: `${data.title} workshop`,
                imageFit: "cover",
                schedule: data.schedule_json?.schedule || [],
                resources: [],
                gallery: [],
            };
        }
    }

    if (!workshop) {
        notFound();
    }

    const upcoming = isUpcomingWorkshop(workshop.startDate, workshop.endDate);

    return (
        <DefaultLayout>
            <main className="min-h-screen bg-white pb-24 pt-16 text-slate-900">
                <article className="mx-auto max-w-6xl px-6 lg:px-10">
                    <header className="grid gap-8 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                        <div>
                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${upcoming ? "bg-amber-300 text-amber-950" : "bg-red-100 text-red-900"}`}>
                                {upcoming ? "Upcoming workshop" : "Completed activity"}
                            </span>
                            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                                {workshop.title}
                            </h1>
                            <dl className="mt-7 grid gap-4 border-l-4 border-red-900 pl-5 text-sm sm:grid-cols-2">
                                <div>
                                    <dt className="font-semibold uppercase tracking-[0.12em] text-slate-500">Date</dt>
                                    <dd className="mt-1 text-base font-semibold text-slate-900">
                                        {formatWorkshopDate(workshop.startDate, workshop.endDate)}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-semibold uppercase tracking-[0.12em] text-slate-500">Location</dt>
                                    <dd className="mt-1 text-base font-semibold text-slate-900">
                                        {workshop.location}
                                    </dd>
                                </div>
                            </dl>
                            <p className="mt-7 text-lg leading-8 text-slate-600">
                                {workshop.description}
                            </p>
                            {(workshop.registration || workshop.resources.length > 0) && (
                                <div className="mt-8 flex flex-wrap gap-3">
                                    {workshop.registration && (
                                        <a
                                            className="btn border-0 bg-amber-300 text-amber-950 hover:bg-amber-400"
                                            href={workshop.registration.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {workshop.registration.label}
                                        </a>
                                    )}
                                    {workshop.resources.map((resource) => (
                                        <a
                                            key={resource.url}
                                            className="btn bg-red-900 text-white hover:bg-red-800"
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {resource.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        {workshop.photoUrl && (
                            <figure className="relative min-h-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.10)] sm:min-h-[430px]">
                                <Image
                                    src={workshop.photoUrl}
                                    alt={workshop.photoAlt}
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 45vw"
                                    className={workshop.imageFit === "contain" ? "object-contain p-5" : "object-cover"}
                                />
                            </figure>
                        )}
                    </header>

                    {workshop.schedule.length > 0 && (
                        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] sm:p-9" aria-labelledby="activity-schedule">
                            <div className="mb-7 max-w-2xl">
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-900">Program</p>
                                <h2 id="activity-schedule" className="mt-2 text-3xl font-bold">Activity schedule</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="table w-full">
                                    <thead>
                                        <tr className="border-slate-200 text-left text-xs uppercase tracking-[0.12em] text-slate-500">
                                            <th className="w-1/4 bg-slate-50">Time</th>
                                            <th className="bg-slate-50">Program activities</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {workshop.schedule.map((item, index) => (
                                            <tr key={`${item.time}-${index}`} className="border-slate-200 align-top">
                                                <td className="font-semibold text-slate-800">{item.time}</td>
                                                <td>
                                                    <ul className="space-y-1 text-slate-600">
                                                        {item.items.map((subItem, subIndex) => (
                                                            <li key={`${subItem}-${subIndex}`} className={subIndex === 0 ? "font-semibold text-slate-900" : ""}>
                                                                {subItem}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {workshop.gallery.length > 0 && (
                        <section className="mt-10" aria-labelledby="workshop-gallery">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-900">From the workshop</p>
                            <h2 id="workshop-gallery" className="mt-2 text-3xl font-bold">Activity gallery</h2>
                            <div className="mt-6 grid gap-6 md:grid-cols-2">
                                {workshop.gallery.map((image) => (
                                    <figure key={image.src} className="relative min-h-80 overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover"
                                        />
                                    </figure>
                                ))}
                            </div>
                        </section>
                    )}
                </article>
            </main>
        </DefaultLayout>
    );
}
