export const runtime = "edge";
import DefaultLayout from '@/app/layouts/DefaultLayout';

import { createClient } from '@/utils/supabase/server';
import {
    formatWorkshopDate,
    isUpcomingWorkshop,
    localWorkshops,
} from '@/server/content/siteUpdates';
import { getManagedPage, hasImportedRepositoryContent } from '@/server/content/managedContent';
import WorkshopCard from './components/WorkshopCard';

type WorkshopListItem = {
    id: string;
    title: string;
    startDate: string;
    endDate?: string;
    location: string;
    photo?: string;
    photoAlt?: string;
    imageFit?: "cover" | "contain";
    featured?: boolean;
    displayOrder?: number;
};

export default async function Workshops() {
    
    const supabase = await createClient();
    const [{ data: workshopList }, managedPage, repositoryContentImported] = await Promise.all([
        supabase.from("workshops").select("*"),
        getManagedPage("workshops"),
        hasImportedRepositoryContent(),
    ]);

    const databaseSlugs = new Set(
        (workshopList || []).map((workshop) => workshop.slug).filter(Boolean),
    );

    const remoteWorkshops: WorkshopListItem[] = (workshopList || []).map((workshop) => ({
        id: String(workshop.slug || workshop.id),
        title: workshop.title,
        startDate: workshop.date,
        endDate: workshop.end_date || undefined,
        location: workshop.location,
        photo: workshop.photo_url,
        photoAlt: workshop.photo_alt || undefined,
        imageFit: workshop.image_fit || undefined,
        featured: workshop.featured || false,
        displayOrder: workshop.display_order || 0,
    }));

    const localWorkshopList: WorkshopListItem[] = (repositoryContentImported ? [] : localWorkshops)
      .filter((workshop) => !databaseSlugs.has(workshop.id))
      .map((workshop) => ({
        id: workshop.id,
        title: workshop.title,
        startDate: workshop.startDate,
        endDate: workshop.endDate,
        location: workshop.location,
        photo: workshop.photoUrl,
        photoAlt: workshop.photoAlt,
        imageFit: workshop.imageFit,
        featured: false,
        displayOrder: 0,
    }));

    const allWorkshops = [...remoteWorkshops, ...localWorkshopList];
    const completedWorkshops = allWorkshops
        .filter((workshop) => !isUpcomingWorkshop(workshop.startDate, workshop.endDate))
        .sort((a, b) => Number(b.featured) - Number(a.featured) || (a.displayOrder || 0) - (b.displayOrder || 0) || b.startDate.localeCompare(a.startDate));
    const upcomingWorkshops = allWorkshops
        .filter((workshop) => isUpcomingWorkshop(workshop.startDate, workshop.endDate))
        .sort((a, b) => Number(b.featured) - Number(a.featured) || (a.displayOrder || 0) - (b.displayOrder || 0) || a.startDate.localeCompare(b.startDate));

    const renderWorkshopGrid = (
        workshops: WorkshopListItem[],
        status: "Completed" | "Upcoming",
    ) => (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {workshops.map((workshop, index) => (
                <WorkshopCard
                    key={workshop.id}
                    id={workshop.id}
                    title={workshop.title}
                    dateLabel={formatWorkshopDate(workshop.startDate, workshop.endDate)}
                    location={workshop.location}
                    photo={workshop.photo}
                    photoAlt={workshop.photoAlt}
                    imageFit={workshop.imageFit}
                    status={status}
                    priority={status === "Upcoming" && index === 0}
                />
            ))}
        </div>
    );

    return (
        <DefaultLayout>
            <main className="min-h-screen bg-white pb-24 pt-20 text-slate-900">
                <section className="mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="max-w-3xl border-b border-slate-200 pb-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-900">
                            {managedPage?.eyebrow || "Training in action"}
                        </p>
                        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                            {managedPage?.heading || "Workshops and activities"}
                        </h1>
                        <p className="mt-5 text-lg leading-8 text-slate-600">
                            {managedPage?.summary || "Explore completed CyberTraining programs, event materials, and upcoming opportunities to learn with the project team."}
                        </p>
                    </div>
                </section>

                {upcomingWorkshops.length > 0 && (
                    <section className="mx-auto mt-14 max-w-7xl px-6 lg:px-10" aria-labelledby="upcoming-workshops">
                        <div className="mb-6 flex items-end justify-between gap-4 border-b border-amber-300 pb-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
                                    Plan ahead
                                </p>
                                <h2 id="upcoming-workshops" className="mt-1 text-3xl font-bold">
                                    Upcoming workshops
                                </h2>
                            </div>
                            <span className="hidden text-sm text-slate-500 sm:block">
                                {upcomingWorkshops.length} scheduled
                            </span>
                        </div>
                        {renderWorkshopGrid(upcomingWorkshops, "Upcoming")}
                    </section>
                )}

                <section className="mx-auto mt-16 max-w-7xl border-t border-slate-200 px-6 pt-14 lg:px-10" aria-labelledby="completed-workshops">
                    <div className="mb-6 flex items-end justify-between gap-4 border-b border-slate-300 pb-4">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-900">
                                Project record
                            </p>
                            <h2 id="completed-workshops" className="mt-1 text-3xl font-bold">
                                Completed workshops and activities
                            </h2>
                        </div>
                        <span className="hidden text-sm text-slate-500 sm:block">
                            {completedWorkshops.length} activities
                        </span>
                    </div>
                    {renderWorkshopGrid(completedWorkshops, "Completed")}
                </section>
            </main>
        </DefaultLayout>
    );
}
