"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function TopHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().catch(() => setIsVideoPlaying(false));
    } else {
      video.pause();
    }
  };

  return (
    <main id="main-content" tabIndex={-1} className="bg-white text-slate-900">
      <section className="relative isolate flex min-h-[760px] items-center overflow-hidden bg-slate-950 text-white lg:min-h-[820px]">
        <Image
          src="/images/HeroBackground.webp"
          alt="Aerial view of a flooded community"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <video
          ref={videoRef}
          aria-hidden="true"
          autoPlay
          disablePictureInPicture
          loop
          muted
          playsInline
          poster="/images/HeroBackground.webp"
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          onPause={() => setIsVideoPlaying(false)}
          onPlay={() => setIsVideoPlaying(true)}
        >
          <source src="/videos/landing-flood.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.45) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-10">
          <div className="max-w-5xl">
            <h1 className="tracking-tight">
              <span className="block text-[clamp(3.75rem,10vw,8.5rem)] font-black leading-[0.8] tracking-[-0.075em]">
                Cyber-DART:
              </span>
              <span className="mt-8 block max-w-3xl text-[clamp(1.45rem,3.2vw,2.8rem)] font-semibold leading-[1.08] text-slate-100">
                An International Cyberinfrastructure-Powered GeoAI Network for Disaster Assessment, Reduction, and Training
              </span>
            </h1>
          </div>

          <div className="mt-12 max-w-3xl border-l-2 border-amber-300/70 pl-4 sm:pl-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300 sm:text-base">
              Funded by NSF award numbers
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-lg font-semibold leading-7 sm:text-xl">
              {["2321069", "2519476", "2321070", "2519477"].map((award) => (
                <li key={award}>
                  <Link
                    className="inline-flex min-h-11 items-center text-amber-300 underline decoration-amber-300/50 underline-offset-4 hover:decoration-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
        <button
          type="button"
          aria-label={isVideoPlaying ? "Pause background video" : "Play background video"}
          className="absolute right-5 top-20 z-10 grid h-11 w-11 place-items-center border border-white/40 bg-slate-950/60 text-white backdrop-blur-sm hover:bg-slate-950/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:hidden sm:right-6 lg:top-24"
          onClick={toggleVideo}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="currentColor"
          >
            {isVideoPlaying ? (
              <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
            ) : (
              <path d="m8 5 11 7-11 7z" />
            )}
          </svg>
        </button>
      </section>
    </main>
  );
}
