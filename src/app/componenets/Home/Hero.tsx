import Image from "next/image";
import Link from "next/link";

export default function TopHero() {
  return (
    <main className="bg-white text-slate-900">
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-slate-950 text-white">
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

        <div className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 sm:py-32 lg:px-10">
          <div className="max-w-5xl">
            <h1 className="max-w-4xl tracking-tight">
              <span className="block text-lg font-semibold uppercase tracking-[0.16em] text-amber-300 sm:text-xl">
                Cyber-DART:
              </span>
              <span className="mt-3 block break-words text-[clamp(1.5rem,7.2vw,3.75rem)] font-bold leading-[1.08]">
                A Cyberinfrastructure-Powered GeoAI Platform for Disaster Assessment, Reduction, and Training
              </span>
            </h1>
            <div className="mt-7 max-w-2xl border-l-2 border-amber-300/70 pl-4 sm:mt-8 sm:pl-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300 sm:text-base">
                Funded by NSF award numbers
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-lg font-semibold leading-7 sm:text-xl">
                {["2321069", "2519476", "2321070", "2519477"].map((award) => (
                  <li key={award}>
                    <Link
                      className="text-amber-300 underline decoration-amber-300/50 underline-offset-4 hover:decoration-amber-300"
                      href={`https://www.nsf.gov/awardsearch/showAward?AWD_ID=${award}&HistoricalAwards=false`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {award}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
