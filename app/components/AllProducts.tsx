"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import type { Product } from "../../data/content";

type Props = {
  products: Product[];
};

export default function AllProducts({ products }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedVolume, setSelectedVolume] = useState<string>("30 ml");
  const [sortBy, setSortBy] = useState<"default" | "low-to-high" | "high-to-low">("default");

  const uniqueVolumes = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.volume).filter(Boolean))).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products
      .filter((p) => !selectedCategory || p.category === selectedCategory)
      .sort((a, b) => {
        if (sortBy === "low-to-high") {
          return (a.priceValue || 0) - (b.priceValue || 0);
        } else if (sortBy === "high-to-low") {
          return (b.priceValue || 0) - (a.priceValue || 0);
        }
        return 0;
      });

    // Smart volume filtering: show selected volume first, then continue with others
    const selectedVolumeProducts = filtered.filter((p) => p.volume === selectedVolume);
    const otherVolumeProducts = filtered.filter((p) => p.volume !== selectedVolume);
    
    return [...selectedVolumeProducts, ...otherVolumeProducts];
  }, [products, selectedCategory, selectedVolume, sortBy]);

  return (
    <section id="all-products" className="bg-white px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.24em] text-orange-600">All Products</p>
          <h2 className="text-3xl font-semibold text-slate-950">Browse our full selection</h2>
        </div>

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`rounded-full px-4 py-1 text-xs font-semibold transition ${
                selectedCategory === null
                  ? "bg-orange-600 text-white"
                  : "border border-slate-300 bg-white text-slate-900 hover:border-orange-600"
              }`}
            >
              All
            </button>
            {["men", "women", "unisex"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1 text-xs font-semibold transition capitalize ${
                  selectedCategory === cat
                    ? "bg-orange-600 text-white"
                    : "border border-slate-300 bg-white text-slate-900 hover:border-orange-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {uniqueVolumes.map((vol) => (
              <button
                key={vol}
                onClick={() => setSelectedVolume(vol as string)}
                className={`rounded-full px-4 py-1 text-xs font-semibold transition ${
                  selectedVolume === vol
                    ? "bg-orange-600 text-white"
                    : "border border-slate-300 bg-white text-slate-900 hover:border-orange-600"
                }`}
              >
                {vol}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "default" | "low-to-high" | "high-to-low")}
              className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-900 transition hover:border-orange-600"
            >
              <option value="default">Sort by</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="max-h-[800px] overflow-y-auto pr-2">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((p) => (
            <article key={p.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="overflow-hidden rounded-3xl">
                <Image src={p.image} alt={p.title} width={720} height={480} className="h-56 w-full object-cover" />
              </div>
              <div className="mt-5 space-y-3">
                <p className="text-base font-semibold text-slate-950">{p.title}</p>
                <p className="text-sm text-slate-500">{p.subtitle}</p>
                {p.volume && <p className="text-xs text-amber-700 font-medium">{p.volume}</p>}
                <div className="flex items-center gap-2 text-lg font-semibold text-slate-950">
                  <span>{p.price}</span>
                </div>
                <button className="mt-4 w-full rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Add to Cart
                </button>
              </div>
            </article>
            ))}
            </div>
          </div>
      </div>
    </section>
  );
}
