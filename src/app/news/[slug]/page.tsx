export const runtime = "edge";

import Image from "next/image";
import { notFound } from "next/navigation";

import DefaultLayout from "@/app/layouts/DefaultLayout";
import { looksLikeUuid, splitParagraphs } from "@/server/content/managedContent";
import { isSafeImageUrl } from "@/utils/content/urls";
import { createClient } from "@/utils/supabase/server";

type Params = Promise<{ slug: string }>;

export default async function NewsDetail({ params }: { params: Params }) {
  const { slug } = await params;
  const supabase = await createClient();
  let story: Record<string, unknown> | null = null;

  const { data: slugMatch, error: slugError } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (!slugError && slugMatch) story = slugMatch;

  if (!story && looksLikeUuid(slug)) {
    const { data: idMatch, error: idError } = await supabase
      .from("news")
      .select("*")
      .eq("id", slug)
      .maybeSingle();
    if (!idError && idMatch) story = idMatch;
  }

  if (!story) notFound();
  const paragraphs = splitParagraphs(String(story.body || story.excerpt || ""), []);
  const imageUrl = isSafeImageUrl(story.image_url) ? story.image_url : null;

  return (
    <DefaultLayout>
      <main className="min-h-screen bg-white pb-24 pt-20 text-slate-900">
        <article className="mx-auto max-w-5xl px-6 lg:px-10">
          <header className="border-b border-slate-200 pb-9">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-900">Project news</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{String(story.title)}</h1>
            {Boolean(story.date) && <p className="mt-5 text-sm font-semibold text-slate-500">{String(story.date)}</p>}
          </header>
          {imageUrl && (
            <figure className="relative mt-10 min-h-80 overflow-hidden border border-slate-200 bg-slate-50 sm:min-h-[520px]">
              <Image
                src={imageUrl}
                alt={String(story.image_alt || `${story.title} news cover`)}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-contain"
              />
            </figure>
          )}
          <div className="mx-auto mt-10 max-w-3xl space-y-6 text-lg leading-8 text-slate-700">
            {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </article>
      </main>
    </DefaultLayout>
  );
}
