import { notFound } from "next/navigation";

import ContentEditor from "../../../../_components/ContentEditor";
import { getCollection } from "../../../../_lib/content";

export const runtime = "edge";

type Params = Promise<{ collection: string; id: string }>;

export default async function EditAdminContentPage({ params }: { params: Params }) {
  const { collection: collectionKey, id } = await params;
  const collection = getCollection(collectionKey);
  if (!collection) notFound();

  return <ContentEditor collectionKey={collectionKey} recordId={id} />;
}
