"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
  title: string;
};

export default function ImageGallery({ images, title }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  const slidePrevious = () => {
    setActiveIndex((current) => (current > 0 ? current - 1 : images.length - 1));
  };

  const slideNext = () => {
    setActiveIndex((current) => (current < images.length - 1 ? current + 1 : 0));
  };

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100 shadow-sm">
        <Image
          src={activeImage}
          alt={`${title} image ${activeIndex + 1}`}
          width={1200}
          height={900}
          className="h-[26rem] w-full object-cover sm:h-[30rem]"
        />

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={slidePrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white transition hover:bg-black/60"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={slideNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white transition hover:bg-black/60"
              aria-label="Next image"
            >
              ›
            </button>
          </>
        ) : null}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`overflow-hidden rounded-3xl border text-left transition focus:outline-none ${
              index === activeIndex
                ? "border-2 border-amber-500 shadow-sm"
                : "border border-slate-200 bg-white"
            }`}
          >
            <Image
              src={image}
              alt={`${title} thumbnail ${index + 1}`}
              width={240}
              height={180}
              className="h-20 w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
