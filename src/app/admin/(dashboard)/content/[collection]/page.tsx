import { notFound } from "next/navigation";

import CollectionList from "../../../_components/CollectionList";
import { getCollection } from "../../../_lib/content";

export const runtime = "edge";

type Params = Promise<{ collection: string }>;

export default async function AdminCollectionPage({ params }: { params: Params }) {
  const { collection: collectionKey } = await params;
  const collection = getCollection(collectionKey);
  if (!collection) notFound();

  return <CollectionList collectionKey={collectionKey} />;
}
