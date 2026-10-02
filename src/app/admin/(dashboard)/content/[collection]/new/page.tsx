import { notFound } from "next/navigation";

import ContentEditor from "../../../../_components/ContentEditor";
import { getCollection } from "../../../../_lib/content";

export const runtime = "edge";

type Params = Promise<{ collection: string }>;

export default async function NewAdminContentPage({ params }: { params: Params }) {
  const { collection: collectionKey } = await params;
  const collection = getCollection(collectionKey);
  if (!collection) notFound();

  return <ContentEditor collectionKey={collectionKey} />;
}
