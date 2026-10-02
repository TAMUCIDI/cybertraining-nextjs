export const runtime = "edge";

import Image from "next/image";
import Link from "next/link";

import DefaultLayout from "../layouts/DefaultLayout";
import { getManagedPage, hasImportedRepositoryContent } from "@/server/content/managedContent";
import { formatWorkshopDate, getLocalWorkshop } from "@/server/content/siteUpdates";
import { isSafeImageUrl } from "@/utils/content/urls";
import { createClient } from "@/utils/supabase/server";

type NewsListItem = {
  id: string;
  title: string;
  excerpt: string;
  date?: string;
  imageUrl?: string;
  imageAlt: string;
  featured: boolean;
  displayOrder: number;
  href: string;
};

export default async function News() {
  const supabase = await createClient();
  const [{ data, error }, managedPage, repositoryContentImported] = await Promise.all([
    supabase.from("news").select("*"),
    getManagedPage("news"),
    hasImportedRepositoryContent(),
  ]);

  let stories: NewsListItem[] = [];
  if (!error && data) {
    stories = data
      .map((story) => ({
        id: String(story.id),
        title: story.title,
        excerpt: story.excerpt || "",
        date: story.date || undefined,
        imageUrl: isSafeImageUrl(story.image_url) ? story.image_url : undefined,
        imageAlt: story.image_alt || `${story.title} news cover`,
        featured: story.featured || false,
        displayOrder: story.display_order || 0,
        href: `/news/${story.slug}`,
      }))
      .sort((a, b) =>
        Number(b.featured) - Number(a.featured)
        || a.displayOrder - b.displayOrder
        || String(b.date || "").localeCompare(String(a.date || "")),
      );
  }

  if (!repositoryContentImported && stories.length === 0) {
    const workshop = getLocalWorkshop("harvard-cga-nairr-workshop-2026");
    if (workshop) {
      stories = [{
        id: workshop.id,
        title: workshop.title,
        excerpt: workshop.description,
        date: formatWorkshopDate(workshop.startDate, workshop.endDate),
        imageUrl: isSafeImageUrl(workshop.photoUrl) ? workshop.photoUrl : undefined,
        imageAlt: workshop.photoAlt || `${workshop.title} workshop`,
        featured: true,
        displayOrder: 0,
        href: `/workshops/${workshop.id}`,
      }];
    }
  }

  const [leadStory, ...moreStories] = stories;

  return (
    <DefaultLayout>
      <main className="min-h-screen bg-white pb-24 pt-20 text-slate-900">
        <section className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl border-b border-slate-200 pb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-900">
              {managedPage?.eyebrow || "Project updates"}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              {managedPage?.heading || "Cyber-DART news"}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              {managedPage?.summary || "Follow new training opportunities, project milestones, and stories from the Cyber-DART network."}
            </p>
          </div>
        </section>

        {leadStory ? (
          <>
            <article className="mx-auto mt-12 grid max-w-7xl gap-9 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
              <div className="max-w-3xl">
                <span className="inline-flex bg-amber-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-950">
                  {leadStory.featured ? "Featured update" : "Latest update"}
                </span>
                {leadStory.date && <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-red-900">{leadStory.date}</p>}
                <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{leadStory.title}</h2>
                <p className="mt-5 line-clamp-6 text-lg leading-8 text-slate-600">{leadStory.excerpt}</p>
                <Link href={leadStory.href} className="mt-8 inline-flex min-h-12 items-center bg-red-900 px-6 text-sm font-bold text-white hover:bg-red-800">
                  Read the update <span className="ml-2" aria-hidden="true">→</span>
                </Link>
              </div>
              {leadStory.imageUrl && (
                <figure className="relative min-h-80 overflow-hidden border border-slate-200 bg-slate-50 shadow-[0_18px_50px_rgba(15,23,42,0.10)] sm:min-h-[440px]">
                  <Image
                    src={leadStory.imageUrl}
                    alt={leadStory.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-contain p-6"
                  />
                </figure>
              )}
            </article>

            {moreStories.length > 0 && (
              <section className="mx-auto mt-16 max-w-7xl border-t border-slate-200 px-6 pt-12 lg:px-10" aria-labelledby="more-news">
                <h2 id="more-news" className="text-2xl font-bold tracking-tight">More project news</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {moreStories.map((story) => (
                    <article key={story.id} className="flex h-full flex-col border border-slate-200 bg-white p-6 shadow-sm">
                      {story.date && <p className="text-xs font-bold uppercase tracking-[0.14em] text-red-800">{story.date}</p>}
                      <h3 className="mt-3 text-xl font-bold leading-snug">{story.title}</h3>
                      <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">{story.excerpt}</p>
                      <Link href={story.href} className="mt-auto pt-5 text-sm font-bold text-red-900">Read story <span aria-hidden="true">→</span></Link>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <section className="mx-auto max-w-7xl px-6 py-20 text-center text-slate-500 lg:px-10">
            News updates are being prepared.
          </section>
        )}
      </main>
    </DefaultLayout>
  );
}
