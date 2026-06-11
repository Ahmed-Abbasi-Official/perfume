"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { BannerSlide } from "../../data/content";

type Props = {
  slides: BannerSlide[];
};

export default function HeroSection({ slides }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const activeSlide = slides[activeIndex];

  return (
    <section id="top" className="relative overflow-hidden bg-white px-6 py-0 lg:px-10">
      <div className="relative mx-auto h-[600px] w-full max-w-7xl rounded-3xl overflow-hidden">
        <Image
          src={activeSlide.image}
          alt={activeSlide.title}
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-start justify-center px-6 py-12 lg:px-20">
          <div className="max-w-2xl space-y-6">
            {/* Badge */}
            <span className={`inline-flex rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${
              activeSlide.type === "deal" ? "bg-red-600 text-white" :
              activeSlide.type === "news" ? "bg-blue-600 text-white" :
              activeSlide.type === "article" ? "bg-purple-600 text-white" :
              "bg-slate-600 text-white"
            }`}>
              {activeSlide.badge || "Featured"}
            </span>

            {/* Subtitle */}
            <p className="text-sm uppercase tracking-[0.3em] text-slate-300">{activeSlide.subtitle}</p>

            {/* Title */}
            <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              {activeSlide.title}
            </h1>

            {/* Line divider */}
            <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-amber-600" />

            {/* Description */}
            <p className="max-w-xl text-lg leading-8 text-slate-100">{activeSlide.description}</p>

            {/* CTA Button */}
            <div className="flex gap-4 pt-4">
              <a
                href={activeSlide.type === "deal" ? "#today-deals" : activeSlide.type === "article" ? "#articles" : "#top-selling"}
                className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-900 transition hover:bg-slate-100 hover:shadow-lg"
              >
                {activeSlide.buttonText}
                <span className="text-lg">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`transition-all ${
                index === activeIndex 
                  ? "h-2 w-12 rounded-full bg-white" 
                  : "h-2 w-2 rounded-full bg-white/40 hover:bg-white/60"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute right-6 bottom-6 text-sm font-semibold text-white/70">
          {activeIndex + 1} / {slides.length}
        </div>
      </div>
    </section>
  );
}
