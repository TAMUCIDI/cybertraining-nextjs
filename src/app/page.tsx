import HomeLayout from "@/app/layouts/HomeLayout"
import { getManagedPage, getSiteSetting } from "@/server/content/managedContent";

import TopHero from "./componenets/Home/Hero";

export const runtime = "edge";

type AwardSetting = {
  awards?: string[];
};

export default async function Home() {
  const [page, awardSetting] = await Promise.all([
    getManagedPage("home"),
    getSiteSetting<AwardSetting>("nsf_awards"),
  ]);
  const managedAwards = Array.isArray(awardSetting?.awards)
    ? awardSetting.awards.filter((award): award is string => typeof award === "string" && /^\d{4,20}$/.test(award))
    : undefined;

  return (
    <HomeLayout>
      <div>
        <TopHero
          heading={page?.heading || undefined}
          awardIntro={page?.summary || undefined}
          awardNumbers={managedAwards?.length ? managedAwards : undefined}
        />
      </div>
    </HomeLayout>
  );
}
