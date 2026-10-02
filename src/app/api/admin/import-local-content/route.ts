export const runtime = "edge";

import {
  getOfficialEmail,
  getOfficialProfileUrl,
  localAdvisoryMembers,
  localNotebooks,
  localProjectLeadershipMembers,
  localWorkshops,
} from "@/server/content/siteUpdates";
import { createClient } from "@/utils/supabase/server";

function jsonError(message: string, status: number) {
  return Response.json({ ok: false, message }, { status });
}

export async function POST() {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return jsonError("Authentication is required.", 401);

  const { data: adminProfile, error: profileError } = await supabase
    .from("admin_profiles")
    .select("role")
    .eq("user_id", userData.user.id)
    .maybeSingle();
  if (profileError || !adminProfile) return jsonError("This account is not a Cyber-DART editor.", 403);

  const publishedAt = new Date().toISOString();
  const notebookPayload = localNotebooks.map((notebook, index) => ({
    slug: notebook.id,
    title: notebook.title,
    category: notebook.category || null,
    author: notebook.author || null,
    file_url: notebook.fileUrl,
    thumbnail_r2_url: notebook.thumbnailUrl || null,
    source_url: notebook.sourceUrl || null,
    status: "published",
    featured: notebook.id === "port-infrastructure-resilience-coastal-hazards",
    display_order: index,
    published_at: publishedAt,
  }));
  const { error: notebookError } = await supabase
    .from("notebooks")
    .upsert(notebookPayload, { onConflict: "slug" });
  if (notebookError) return jsonError(`Modules: ${notebookError.message}`, 500);

  const workshopPayload = localWorkshops.map((workshop, index) => ({
    slug: workshop.id,
    title: workshop.title,
    date: workshop.startDate,
    end_date: workshop.endDate || null,
    location: workshop.location,
    description: workshop.description,
    photo_url: workshop.photoUrl || null,
    photo_alt: workshop.photoAlt || null,
    image_fit: workshop.imageFit || "cover",
    schedule_json: { schedule: workshop.schedule },
    resources_json: workshop.resources || null,
    gallery_json: workshop.gallery || null,
    biographies_json: workshop.biographies || null,
    registration_json: workshop.registration || null,
    status: "published",
    featured: false,
    display_order: index,
    published_at: publishedAt,
  }));
  const { data: workshopRows, error: workshopError } = await supabase
    .from("workshops")
    .upsert(workshopPayload, { onConflict: "slug" })
    .select("id,slug");
  if (workshopError) return jsonError(`Workshops: ${workshopError.message}`, 500);

  const localPeople = [...localProjectLeadershipMembers, ...localAdvisoryMembers];
  const personPayload = localPeople.map((person, index) => ({
    slug: person.name
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""),
    name: person.name,
    email: getOfficialEmail(person.name, person.email) || null,
    role: localProjectLeadershipMembers.some((member) => member.name === person.name) ? "Co-PI" : "Member",
    display_role: person.displayRole || null,
    affiliation: person.affiliation,
    img_url: person.img,
    profile_url: getOfficialProfileUrl(person.name, person.profileUrl) || null,
    visible_on_about: true,
    display_order: person.name === "Michael Goodchild" ? -100 : index,
    status: "published",
  }));
  if (personPayload.length > 0) {
    const { error: peopleError } = await supabase
      .from("people")
      .upsert(personPayload, { onConflict: "slug" });
    if (peopleError) return jsonError(`People: ${peopleError.message}`, 500);
  }

  const newsWorkshop = localWorkshops.find((workshop) => workshop.id === "harvard-cga-nairr-workshop-2026");
  if (newsWorkshop) {
    const relatedWorkshop = workshopRows?.find((workshop) => workshop.slug === newsWorkshop.id);
    const { error: newsError } = await supabase.from("news").upsert({
      slug: newsWorkshop.id,
      title: newsWorkshop.title,
      excerpt: newsWorkshop.description,
      body: newsWorkshop.description,
      date: newsWorkshop.startDate,
      image_url: newsWorkshop.photoUrl || null,
      image_alt: newsWorkshop.photoAlt || null,
      related_workshop_id: relatedWorkshop?.id || null,
      status: "published",
      featured: true,
      display_order: 0,
      published_at: publishedAt,
    }, { onConflict: "slug" });
    if (newsError) return jsonError(`News: ${newsError.message}`, 500);
  }

  const counts = {
    notebooks: notebookPayload.length,
    workshops: workshopPayload.length,
    people: personPayload.length,
    news: newsWorkshop ? 1 : 0,
  };
  const { error: markerError } = await supabase.from("site_settings").upsert({
    key: "repository_content_import",
    label: "Repository content import",
    value_json: {
      completed: true,
      completed_at: publishedAt,
      counts,
    },
    status: "published",
  }, { onConflict: "key" });
  if (markerError) return jsonError(`Import marker: ${markerError.message}`, 500);

  return Response.json({
    ok: true,
    counts,
  });
}
