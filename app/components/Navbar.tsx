"use client";

import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-3 lg:px-10">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="#top" className="text-xl font-semibold text-slate-900">Scent Stellar</a>
          </div>

          <div className="hidden gap-6 text-sm font-medium md:flex">
            <a href="#top" className="text-slate-700 hover:text-slate-900">Home</a>
            <a href="#all-products" className="text-slate-700 hover:text-slate-900">All Products</a>
            <a href="#top-selling" className="text-slate-700 hover:text-slate-900">Top Selling</a>
            <a href="#today-deals" className="text-slate-700 hover:text-slate-900">Deals</a>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2.5  px-3 py-1 md:flex">
              <a href="#" aria-label="Instagram" className="text-[#E1306C] hover:text-[#C13584]">
                                    <FaInstagram size={20} />
                                  </a>
              <a href="#" aria-label="Facebook" className="text-[#1877F2] hover:text-[#165fce]">
                                    <FaFacebookF size={20} />
                                  </a>
                                  <a href="#" aria-label="TikTok" className="text-[#292929] hover:text-[#010101]">
                                    <SiTiktok size={20} />
                                  </a>
            </div>
            <button className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">Cart</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
