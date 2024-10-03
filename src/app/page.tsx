import HomeLayout from "@/app/layouts/HomeLayout"

import TopHero from "./componenets/Home/Hero";

export default function Home() {
  return (
    <HomeLayout>
      <div>
        <TopHero/>
      </div>
    </HomeLayout>
  );
}
