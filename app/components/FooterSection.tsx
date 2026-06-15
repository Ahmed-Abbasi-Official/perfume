import { FaFacebookF, FaInstagram, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export default function FooterSection() {
  return (
    <footer className="bg-white text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        <div className="grid gap-8 sm:grid-cols-2 items-start">
          <div>
            <p className="mb-2 text-xl sm:text-2xl font-semibold text-slate-900">Scent Steller</p>
            <p className="mt-2 max-w-lg text-sm text-slate-600">Discover premium luxury perfumes crafted to leave a lasting impression. Our carefully selected fragrance collection combines elegance, quality, and long-lasting scents, making every moment feel special. Whether for daily wear or special occasions, find the perfect fragrance that reflects your style and personality.</p>
          </div>

          <div className="space-y-4">
            <div className="flex w-full flex-col items-center justify-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center sm:p-6 sm:flex-row sm:items-center sm:justify-between sm:text-left">
              {/* Left: Location - icon + text aligned */}
              <div className="flex w-full items-center justify-center gap-3 sm:w-1/2 sm:justify-start">
                
                <div>
                  <p className="flex md:justify-start justify-center -space-y-2 gap-1 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500"><span><FaMapMarkerAlt size={15} className=" text-[#E53E3E]  flex-shrink-0" /></span> Location</p>
                  <address className="not-italic text-sm text-slate-600">Shop# UG131, Rubi Cinema & Shopping Mall, Baldia Town Sector 5 Saeedabad, Karachi, 75760 Pakistan</address>
                </div>
              </div>

              {/* Right: Follow icons and WhatsApp stacked on mobile, aligned to end on larger screens */}
              <div className="flex w-full h-full flex-col items-center gap-3 sm:items-end sm:w-1/2">
                <div className="w-full">
                  <p className="mb-2 text-sm font-semibold text-center uppercase tracking-[0.12em] text-slate-500">Follow Us</p>
                  <div className="flex items-center justify-center gap-4">
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
                </div>

                <div className="flex items-center justify-center w-full gap-2">
                  <FaWhatsapp size={18} className="text-[#25D366] flex-shrink-0" />
                  <a href="https://wa.me/923231835011" className="break-words text-sm text-slate-700 hover:text-orange-600">
                    +92 3231835011
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 text-sm text-slate-500">
          <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p>© 2026 AURALUX. All Rights Reserved.</p>
            <p>Luxury perfumes crafted for memorable moments.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
