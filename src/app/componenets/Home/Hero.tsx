import Image from "next/image";
import Link from "next/link";

export default function TopHero() {
  return (
    <main className="bg-white text-slate-900">
      <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-slate-950 text-white">
        <Image
          src="/images/HeroBackground.webp"
          alt="Aerial view of a flooded community"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <video
          aria-hidden="true"
          autoPlay
          disablePictureInPicture
          loop
          muted
          playsInline
          poster="/images/HeroBackground.webp"
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        >
          <source src="/videos/landing-flood.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-slate-950/15" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-32 lg:px-10">
          <div className="max-w-5xl">
            <h1 className="text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
              Cyber-DART: A Cyberinfrastructure-Powered GeoAI Platform for Disaster Assessment, Reduction, and Training
            </h1>
            <p className="mt-8 text-lg font-semibold text-slate-200 sm:text-xl">
              Funded by NSF award numbers:{" "}
              <Link
                className="text-amber-300 underline decoration-amber-300/50 underline-offset-4 hover:decoration-amber-300"
                href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=2321069&HistoricalAwards=false"
                target="_blank"
                rel="noopener noreferrer"
              >
                2321069
              </Link>
              {", "}
              <Link
                className="text-amber-300 underline decoration-amber-300/50 underline-offset-4 hover:decoration-amber-300"
                href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=2519476&HistoricalAwards=false"
                target="_blank"
                rel="noopener noreferrer"
              >
                2519476
              </Link>
              {", "}
              <Link
                className="text-amber-300 underline decoration-amber-300/50 underline-offset-4 hover:decoration-amber-300"
                href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=2321070&HistoricalAwards=false"
                target="_blank"
                rel="noopener noreferrer"
              >
                2321070
              </Link>
              {", "}
              <Link
                className="text-amber-300 underline decoration-amber-300/50 underline-offset-4 hover:decoration-amber-300"
                href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=2519477&HistoricalAwards=false"
                target="_blank"
                rel="noopener noreferrer"
              >
                2519477
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
