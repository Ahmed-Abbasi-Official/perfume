"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "../../data/content";

type Props = {
  products: Product[];
};

type EnrichedProduct = Product & {
  range: "Executive" | "Premium" | "Classic";
  genre: "Arabic" | "French";
  rating: number;
  ratingCount: number;
};

export default function ProductsListClient({ products }: Props) {
  // 1. State declarations
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRanges, setSelectedRanges] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"featured" | "low-to-high" | "high-to-low">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter sections collapsibility
  const [rangeOpen, setRangeOpen] = useState(true);
  const [genderOpen, setGenderOpen] = useState(true);
  const [genreOpen, setGenreOpen] = useState(true);

  // 2. Lock body scroll on mobile when filters are open
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (mobileFiltersOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }
    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "unset";
      }
    };
  }, [mobileFiltersOpen]);

  // 3. Dynamic enrichment of products
  const enrichedProducts = useMemo<EnrichedProduct[]>(() => {
    return products.map((product) => {
      // Determine Range
      let range: "Executive" | "Premium" | "Classic" = "Classic";
      if (product.priceValue && product.priceValue >= 2500) {
        range = "Executive";
      } else if (
        product.subtitle.toLowerCase().includes("executive") ||
        product.title.toLowerCase().includes("executive")
      ) {
        range = "Executive";
      } else if (
        product.subtitle.toLowerCase().includes("premium") ||
        product.title.toLowerCase().includes("premium")
      ) {
        range = "Premium";
      }

      // Determine Genre
      let genre: "Arabic" | "French" = "French";
      if (
        product.title.toLowerCase().includes("arabic") ||
        product.title.toLowerCase().includes("oud") ||
        product.title.toLowerCase().includes("sheikh") ||
        product.title.toLowerCase().includes("bakham") ||
        product.subtitle.toLowerCase().includes("oriental") ||
        product.subtitle.toLowerCase().includes("oud") ||
        product.subtitle.toLowerCase().includes("amber")
      ) {
        genre = "Arabic";
      } else {
        // Distribute some deterministically for realistic filter matching
        const idNum = parseInt(product.id.replace(/\D/g, "")) || 0;
        if (idNum % 3 === 0) {
          genre = "Arabic";
        }
      }

      // Generate stable star rating and review count from product ID
      const idNum = parseInt(product.id.replace(/\D/g, "")) || 1;
      const rating = 4.0 + (idNum % 10) * 0.1; // 4.0 to 4.9
      const ratingCount = 15 + (idNum * 23) % 580; // 15 to 595

      // Dynamically add a discounted oldPrice if none exists
      let oldPrice = product.oldPrice;
      if (!oldPrice && product.priceValue) {
        const originalPrice = Math.round((product.priceValue * 1.25) / 50) * 50;
        oldPrice = `${originalPrice.toLocaleString()} Rs.`;
      }

      // Add a dynamic badge if none exists
      let badge = product.badge;
      if (!badge) {
        if (product.isTopSelling) {
          badge = "BEST SELLER";
        } else if (idNum % 7 === 0) {
          badge = "PRE-ORDER NOW";
        } else if (idNum % 5 === 0) {
          badge = "SALE";
        }
      }

      return {
        ...product,
        range,
        genre,
        rating,
        ratingCount,
        oldPrice,
        badge,
      };
    });
  }, [products]);

  // 4. Calculate static category totals for filters
  const filterCounts = useMemo(() => {
    const counts = {
      // Range counts
      Executive: enrichedProducts.filter((p) => p.range === "Executive").length,
      Premium: enrichedProducts.filter((p) => p.range === "Premium").length,
      Classic: enrichedProducts.filter((p) => p.range === "Classic").length,
      // Gender counts
      Men: enrichedProducts.filter((p) => p.category === "men").length,
      Women: enrichedProducts.filter((p) => p.category === "women").length,
      Unisex: enrichedProducts.filter((p) => p.category === "unisex").length,
      // Genre counts
      Arabic: enrichedProducts.filter((p) => p.genre === "Arabic").length,
      French: enrichedProducts.filter((p) => p.genre === "French").length,
    };
    return counts;
  }, [enrichedProducts]);

  // 5. Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let list = [...enrichedProducts];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q)
      );
    }

    // Range checkbox filter
    if (selectedRanges.length > 0) {
      list = list.filter((p) => selectedRanges.includes(p.range));
    }

    // Gender (category) checkbox filter
    if (selectedGenders.length > 0) {
      list = list.filter((p) => {
        const catMap: Record<string, string> = { men: "Men", women: "Women", unisex: "Unisex" };
        const displayGender = catMap[p.category || ""] || "Unisex";
        return selectedGenders.includes(displayGender);
      });
    }

    // Genre checkbox filter
    if (selectedGenres.length > 0) {
      list = list.filter((p) => selectedGenres.includes(p.genre));
    }

    // Sorting logic
    if (sortBy === "low-to-high") {
      list.sort((a, b) => (a.priceValue || 0) - (b.priceValue || 0));
    } else if (sortBy === "high-to-low") {
      list.sort((a, b) => (b.priceValue || 0) - (a.priceValue || 0));
    }

    return list;
  }, [enrichedProducts, searchQuery, selectedRanges, selectedGenders, selectedGenres, sortBy]);

  // Toggle helpers
  const toggleRange = (val: string) => {
    setSelectedRanges((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const toggleGender = (val: string) => {
    setSelectedGenders((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const toggleGenre = (val: string) => {
    setSelectedGenres((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const clearAllFilters = () => {
    setSelectedRanges([]);
    setSelectedGenders([]);
    setSelectedGenres([]);
    setSearchQuery("");
  };

  // WhatsApp order template link helper
  const getWhatsAppLink = (p: EnrichedProduct) => {
    const text = `Hello Scent Steller,\nI would like to purchase the following fragrance:\n\nName: ${p.title}\nRange: ${p.range} Range\nPrice: ${p.price}\nVolume: ${p.volume || "50 ml"}\n\nPlease guide me on completing my order. Thank you!`;
    return `https://wa.me/923231835011?text=${encodeURIComponent(text)}`;
  };

  // Sleek star rendering helper
  const renderStars = (rating: number) => {
    const roundedRating = Math.round(rating);
    return (
      <div className="flex items-center gap-0.5 text-amber-500">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-3.5 w-3.5 ${i < roundedRating ? "fill-amber-500 text-amber-500" : "fill-slate-200 text-slate-200"
              }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Subcomponent for filter contents to avoid repetition between desktop sidebar and mobile drawer
  const FilterGroups = () => (
    <div className="space-y-6">
      {/* Search Input for Mobile View */}
      <div className="block lg:hidden">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
          Search Products
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-slate-100 border border-slate-200 rounded-md py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:bg-white transition"
          />
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Range Group */}
      <div className="border-b border-slate-200 pb-5">
        <button
          type="button"
          onClick={() => setRangeOpen(!rangeOpen)}
          className="flex w-full items-center justify-between py-2 text-sm font-semibold text-slate-900"
        >
          <span>Range</span>
          <svg
            className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${rangeOpen ? "rotate-180" : ""
              }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {rangeOpen && (
          <div className="mt-3 space-y-2.5">
            {["Executive", "Premium", "Classic"].map((r) => (
              <label
                key={r}
                className="flex items-center gap-3 cursor-pointer group text-sm text-slate-700 hover:text-slate-900"
              >
                <input
                  type="checkbox"
                  checked={selectedRanges.includes(r)}
                  onChange={() => toggleRange(r)}
                  className="h-4 w-4 rounded border-slate-300 accent-orange-600 focus:ring-orange-500 cursor-pointer"
                />
                <span className="transition-transform group-hover:translate-x-0.5">
                  {r} Range{" "}
                  <span className="text-xs text-slate-400 font-normal">
                    ({filterCounts[r as keyof typeof filterCounts] || 0})
                  </span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Gender Group */}
      <div className="border-b border-slate-200 pb-5">
        <button
          type="button"
          onClick={() => setGenderOpen(!genderOpen)}
          className="flex w-full items-center justify-between py-2 text-sm font-semibold text-slate-900"
        >
          <span>Gender</span>
          <svg
            className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${genderOpen ? "rotate-180" : ""
              }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {genderOpen && (
          <div className="mt-3 space-y-2.5">
            {["Men", "Women", "Unisex"].map((g) => (
              <label
                key={g}
                className="flex items-center gap-3 cursor-pointer group text-sm text-slate-700 hover:text-slate-900"
              >
                <input
                  type="checkbox"
                  checked={selectedGenders.includes(g)}
                  onChange={() => toggleGender(g)}
                  className="h-4 w-4 rounded border-slate-300 accent-orange-600 focus:ring-orange-500 cursor-pointer"
                />
                <span className="transition-transform group-hover:translate-x-0.5">
                  {g}{" "}
                  <span className="text-xs text-slate-400 font-normal">
                    ({filterCounts[g as keyof typeof filterCounts] || 0})
                  </span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Genre Group */}
      <div className="pb-2">
        <button
          type="button"
          onClick={() => setGenreOpen(!genreOpen)}
          className="flex w-full items-center justify-between py-2 text-sm font-semibold text-slate-900"
        >
          <span>Genre</span>
          <svg
            className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${genreOpen ? "rotate-180" : ""
              }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {genreOpen && (
          <div className="mt-3 space-y-2.5">
            {["Arabic", "French"].map((g) => (
              <label
                key={g}
                className="flex items-center gap-3 cursor-pointer group text-sm text-slate-700 hover:text-slate-900"
              >
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(g)}
                  onChange={() => toggleGenre(g)}
                  className="h-4 w-4 rounded border-slate-300 accent-orange-600 focus:ring-orange-500 cursor-pointer"
                />
                <span className="transition-transform group-hover:translate-x-0.5">
                  {g}{" "}
                  <span className="text-xs text-slate-400 font-normal">
                    ({filterCounts[g as keyof typeof filterCounts] || 0})
                  </span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white py-16 px-6 sm:px-10 flex flex-col items-center justify-center text-center shadow-lg">
        {/* Glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-500">
            Scent Stellar Premium
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">All Products</h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto font-light leading-relaxed">
            Explore our curated collection of signature fragrances. Indulge in premium craftsmanship
            and find your perfect scent profile.
          </p>

          {/* Dynamic Search Box */}
          <div className="pt-2 max-w-md mx-auto hidden lg:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fragrances, categories, range..."
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-md py-3.5 pl-12 pr-6 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-slate-900/50 transition duration-300"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Dynamic Title / Breadcrumb Row */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {selectedRanges.length === 1 ? `${selectedRanges[0]} Range` : "All Products"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Showing {filteredProducts.length} of {enrichedProducts.length} items
            </p>
          </div>

          {/* Interactive controls */}
          <div className="flex items-center gap-4">
            {/* Grid/List View Toggles */}
            <div className="hidden sm:flex items-center rounded-lg border border-slate-200 bg-white p-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition ${viewMode === "grid" ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600"
                  }`}
                title="Grid view"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition ${viewMode === "list" ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600"
                  }`}
                title="List view"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="hidden sm:inline text-xs font-semibold text-slate-500 uppercase">
                Sort:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer shadow-sm"
              >
                <option value="featured">Featured</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95"
            >
              <svg className="h-4.5 w-4.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              Filters
              {(selectedRanges.length > 0 || selectedGenders.length > 0 || selectedGenres.length > 0) && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white">
                  {selectedRanges.length + selectedGenders.length + selectedGenres.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-8 items-start">
          {/* Desktop Filter Sidebar - Column 1 (Sticky & Scrollable) */}
          <aside className="hidden lg:block border border-slate-200 bg-white p-6 rounded-md shadow-sm sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto thin-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
              <span className="text-base font-bold text-slate-950">Filters</span>
              {(selectedRanges.length > 0 ||
                selectedGenders.length > 0 ||
                selectedGenres.length > 0 ||
                searchQuery) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition"
                  >
                    Clear All
                  </button>
                )}
            </div>
            <FilterGroups />
          </aside>

          {/* Products View - Column 3 */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="rounded-md border border-dashed border-slate-300 bg-white py-20 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-base font-semibold text-slate-900">No products found</h3>
                <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                  We couldn&apos;t find any fragrance matching your selected filters. Try broadening
                  your search or clearing filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 inline-flex items-center justify-center rounded-md bg-slate-950 px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              /* Grid View Mode - 4 columns on large screens with tight spacing gap-4 */
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((p) => (
                  <Link key={p.id} href={`/product/${p.id}`} className="group block">
                    <article className="h-full rounded-md border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col overflow-hidden justify-between">
                      {/* Image + Badge container (Flush with borders) */}
                      <div className="relative overflow-hidden w-full h-48 bg-slate-50 shrink-0">
                        {p.badge && (
                          <span
                            className={`absolute top-3.5 left-3.5 z-10 rounded-sm px-2 py-0.5 text-[8px] font-bold tracking-wider uppercase ${
                              p.badge === "PRE-ORDER NOW"
                                ? "bg-slate-950 text-white"
                                : p.badge === "SALE"
                                ? "bg-red-600 text-white"
                                : "bg-amber-600 text-white"
                            }`}
                          >
                            {p.badge}
                          </span>
                        )}
                        <Image
                          src={p.image}
                          alt={p.title}
                          width={720}
                          height={480}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Content details and pricing (padded) */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        {/* Text and rating details */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-1">
                            {renderStars(p.rating)}
                            <span className="text-[10px] text-slate-400 font-medium">
                              ({p.ratingCount})
                            </span>
                          </div>

                          <h3 className="text-sm font-semibold text-slate-950 group-hover:text-orange-600 transition-colors line-clamp-1">
                            {p.title}
                          </h3>

                          <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                            {p.range} Range
                          </p>

                          <p className="text-[10px] text-amber-700 font-medium flex items-center gap-1.5">
                            <span>{p.genre}</span>
                            <span>•</span>
                            <span className="capitalize">{p.category}</span>
                            {p.volume && (
                              <>
                                <span>•</span>
                                <span>{p.volume}</span>
                              </>
                            )}
                          </p>
                        </div>

                        {/* Pricing row */}
                        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-1 shrink-0">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-950">{p.price}</span>
                            {p.oldPrice && (
                              <span className="text-[10px] text-slate-400 line-through">
                                {p.oldPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              /* List View Mode */
              <div className="space-y-4">
                {filteredProducts.map((p) => (
                  <Link key={p.id} href={`/product/${p.id}`} className="group block">
                    <article className="rounded-md border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:shadow-md flex flex-col md:flex-row gap-4 items-center">
                      {/* Image container */}
                      <div className="relative shrink-0 w-full md:w-48 h-48 overflow-hidden rounded-md bg-slate-50">
                        {p.badge && (
                          <span
                            className={`absolute top-3 left-3 z-10 rounded-sm px-2 py-0.5 text-[8px] font-bold tracking-wider uppercase ${p.badge === "PRE-ORDER NOW"
                                ? "bg-slate-950 text-white"
                                : p.badge === "SALE"
                                  ? "bg-red-600 text-white"
                                  : "bg-amber-600 text-white"
                              }`}
                          >
                            {p.badge}
                          </span>
                        )}
                        <Image
                          src={p.image}
                          alt={p.title}
                          width={480}
                          height={480}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Content details */}
                      <div className="flex-1 space-y-2.5 w-full text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-1.5">
                          {renderStars(p.rating)}
                          <span className="text-[11px] text-slate-400 font-medium">
                            ({p.ratingCount} reviews)
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-950 group-hover:text-orange-600 transition-colors">
                          {p.title}
                        </h3>

                        <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
                          {p.range} Range • {p.genre} Scent •{" "}
                          <span className="capitalize">{p.category}</span>
                        </p>

                        <p className="text-sm text-slate-500 line-clamp-2">
                          {p.description ||
                            "A carefully crafted signature perfume with deep base notes, perfect for making an outstanding presentation."}
                        </p>
                      </div>

                      {/* Buy Row */}
                      <div className="shrink-0 flex flex-col items-center md:items-end gap-3 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                        <div className="text-center md:text-right">
                          <p className="text-2xl font-bold text-slate-950">{p.price}</p>
                          {p.oldPrice && (
                            <p className="text-sm text-slate-400 line-through mt-0.5">
                              {p.oldPrice}
                            </p>
                          )}
                        </div>

                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Filters Panel Overlay) */}
      <div
        className={`fixed inset-0 z-[10000] overflow-hidden transition-all duration-300 ${mobileFiltersOpen ? "visible bg-black/70 opacity-100" : "pointer-events-none invisible opacity-0"
          }`}
        onClick={() => setMobileFiltersOpen(false)}
      >
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] w-full rounded-t-2xl bg-white p-6 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${mobileFiltersOpen ? "translate-y-0" : "translate-y-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-900">Filters</span>
              {(selectedRanges.length > 0 ||
                selectedGenders.length > 0 ||
                selectedGenres.length > 0) && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white animate-pulse">
                    {selectedRanges.length + selectedGenders.length + selectedGenres.length}
                  </span>
                )}
            </div>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Collapsible Filters Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto py-5 pr-1 space-y-6">
            <FilterGroups />
          </div>

          {/* Footer Actions */}
          <div className="border-t border-slate-200 pt-4 mt-2 grid grid-cols-2 gap-4 shrink-0">
            <button
              onClick={() => {
                clearAllFilters();
                setMobileFiltersOpen(false);
              }}
              className="rounded-md border border-slate-200 bg-slate-50 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Clear All
            </button>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="rounded-md bg-slate-950 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Apply ({filteredProducts.length} Results)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
