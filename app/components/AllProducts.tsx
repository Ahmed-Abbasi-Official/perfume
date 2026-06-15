"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "../../data/content";


type Props = {
  products: Product[];
};

export default function AllProducts({ products }: Props) {
  // Show only first 4 products on the Home page preview
  const previewProducts = products.slice(0, 4);

  return (
    <section id="all-products" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="md:mb-10 mb-4 flex flex-col  justify-between items-start gap-1  ">
          <div className="flex w-full justify-between">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange-600">All Products</p>

            <Link
              href="/products"
              className="inline-flex items-center gap-2   text-md font-bold text-slate-700 transition hover:border-slate-900 hover:text-slate-950 active:scale-95 underline"
            >
              View All
              <svg
                className="h-4 w-4 text-slate-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <h2 className="md:text-3xl text-2xl font-bold text-slate-950 mt-1">Explore Our Collection</h2>
        </div>

        <div className="thin-scrollbar flex flex-nowrap gap-4 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          {previewProducts.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`} className="group block flex-none w-[48vw] sm:w-[240px] md:w-[265px] lg:w-[295px]">
              <article className="h-full rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col overflow-hidden justify-between">
                {/* Image (Flush with card top, left, right) */}
                <div className="relative overflow-hidden w-full aspect-[4/5] bg-slate-50 shrink-0">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content details and pricing (padded) */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-slate-950 group-hover:text-orange-600 transition-colors line-clamp-1">
                      {p.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-1">{p.subtitle}</p>
                    {p.volume && <p className="text-xs text-amber-700 font-medium">{p.volume}</p>}
                  </div>

                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

