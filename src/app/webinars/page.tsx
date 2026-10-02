export const runtime = "edge";
import DefaultLayout from "@/app/layouts/DefaultLayout";

import { createClient } from "@/utils/supabase/server";
import { getManagedPage } from "@/server/content/managedContent";
import WebinarCard from "./components/WebinarCard";

export default async function Webinars() {
    const supabase = await createClient();
    const [{ data }, managedPage] = await Promise.all([
        supabase.from("webinars").select("*"),
        getManagedPage("webinars"),
    ]);
    const webinarList = (data || []).sort((a, b) =>
        Number(b.featured || false) - Number(a.featured || false) ||
        (a.display_order || 0) - (b.display_order || 0) ||
        String(b.date || "").localeCompare(String(a.date || "")),
    );
    
    return (
        <DefaultLayout>
            <main className="min-h-screen bg-white pb-24 pt-20 text-slate-900">
                <section className="mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="max-w-3xl border-b border-slate-200 pb-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-900">{managedPage?.eyebrow || "Shared expertise"}</p>
                        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{managedPage?.heading || "CyberTraining webinars"}</h1>
                        <p className="mt-5 text-lg leading-8 text-slate-600">
                            {managedPage?.summary || "Hear from researchers and practitioners working across cyberinfrastructure, geospatial science, GeoAI, and disaster management."}
                        </p>
                    </div>
                </section>
                <section className="mx-auto mt-10 max-w-7xl px-6 lg:px-10" aria-label="CyberTraining webinar library">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {webinarList?.map((webinar, index: number) => (
                        <WebinarCard
                            key={webinar.id}
                            id={String(webinar.slug || webinar.id)}
                            title={webinar.title}
                            time={webinar.date}
                            speaker={webinar.speaker}
                            description={webinar.description}
                            img={webinar.thumbnail_r2_url}
                            priority={index === 0}
                        />
                    ))}
                    </div>
                </section>
            </main>
        </DefaultLayout>
    );
}
