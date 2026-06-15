"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (hash: string) => {
    const target = `/${hash}`;
    if (pathname !== "/") {
      router.push(target);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      window.history.replaceState(null, "", hash);
    }
    setMenuOpen(false);
  };

  // Lock body scroll when menu is open
  if (typeof window !== "undefined") {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.overflowX = "unset";
    }
  }

  return (
    <header className="sticky top-0 overflow-hidden z-50 bg-white shadow-sm">
      <div className="mx-auto  max-w-7xl px-6 py-3  lg:px-10">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="#top" className="text-xl font-semibold text-slate-900">Scent Stellar</a>
          </div>

          <div className="hidden gap-6 text-sm font-medium md:flex">
            <button type="button" onClick={() => handleNavClick("#top")} className="text-slate-700 hover:text-slate-900">Home</button>
            <button type="button" onClick={() => router.push("/products")} className="text-slate-700 hover:text-slate-900">All Products</button>
            <button type="button" onClick={() => handleNavClick("#top-selling")} className="text-slate-700 hover:text-slate-900">Top Selling</button>
            <button type="button" onClick={() => handleNavClick("#today-deals")} className="text-slate-700 hover:text-slate-900">Deals</button>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2.5 px-3 py-1 md:flex">
              <a href="https://www.instagram.com/scent_stellar/" aria-label="Instagram" className="text-[#E1306C] hover:text-[#C13584]" target="_blank">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.facebook.com/Scentstellar/" aria-label="Facebook" className="text-[#1877F2] hover:text-[#165fce]" target="_blank">
                <FaFacebookF size={20} />
              </a>
              <a href="https://www.tiktok.com/@scent.stellar" aria-label="TikTok" className="text-[#292929] hover:text-[#010101]" target="_blank">
                <SiTiktok size={20} />
              </a>
            </div>

            <CartDrawer />

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
              aria-label="Open menu"
            >
              <AiOutlineMenu size={22} />
            </button>
          </div>
        </nav>
      </div>

      <div
        className={`fixed inset-0 z-[9999] overflow-hidden transition-all duration-300 ${menuOpen ? "visible bg-black/80 opacity-100 " : "pointer-events-none invisible opacity-0 backdrop-blur-none"}`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`fixed right-0 top-0 z-50 h-screen w-[85%] max-w-2xl bg-white p-8 shadow-[0_25px_80px_rgba(15,23,42,0.18)] transition-all duration-300 ease-out overflow-y-auto overflow-x-hidden ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-slate-900">Menu</p>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 shadow-sm hover:bg-slate-100"
              aria-label="Close menu"
            >
              <AiOutlineClose size={24} />
            </button>
          </div>

          <div className="mt-8 space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-4 pl-12 text-base text-slate-700 placeholder-slate-400 transition focus:border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-200"
              />
              <svg className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="space-y-4 border-t border-slate-200 pt-8">
              <button type="button" onClick={() => handleNavClick("#top")} className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-left text-base font-medium text-slate-800 transition hover:border-slate-300 hover:bg-white">Home</button>
              <button type="button" onClick={() => { router.push("/products"); setMenuOpen(false); }} className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-left text-base font-medium text-slate-800 transition hover:border-slate-300 hover:bg-white">All Products</button>
              <button type="button" onClick={() => handleNavClick("#top-selling")} className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-left text-base font-medium text-slate-800 transition hover:border-slate-300 hover:bg-white">Top Selling</button>
              <button type="button" onClick={() => handleNavClick("#today-deals")} className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-left text-base font-medium text-slate-800 transition hover:border-slate-300 hover:bg-white">Deals</button>
            </div>

            <div className="flex justify-center gap-6 border-t border-slate-200 pt-8">
              <a href="#" aria-label="Instagram" className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[#E1306C] transition hover:bg-white hover:shadow-md">
                <FaInstagram size={22} />
              </a>
              <a href="#" aria-label="Facebook" className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[#1877F2] transition hover:bg-white hover:shadow-md">
                <FaFacebookF size={22} />
              </a>
              <a href="#" aria-label="TikTok" className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-900 transition hover:bg-white hover:shadow-md">
                <SiTiktok size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
