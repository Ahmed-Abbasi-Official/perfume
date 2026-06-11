import { FaFacebookF, FaInstagram, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export default function FooterSection() {
  return (
    <footer className="bg-white text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        <div className="grid gap-8 sm:grid-cols-2 items-start">
          <div>
            <p className="mb-2 text-xl sm:text-2xl font-semibold text-orange-600">Scent Steller</p>
            <p className="mt-2 max-w-lg text-sm text-slate-600">Discover premium luxury perfumes crafted to leave a lasting impression. Our carefully selected fragrance collection combines elegance, quality, and long-lasting scents, making every moment feel special. Whether for daily wear or special occasions, find the perfect fragrance that reflects your style and personality.</p>
          </div>

          <div className="space-y-4">
            <div className="flex w-full flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Left: Location - icon + text aligned */}
              <div className="flex w-full items-start gap-3 sm:w-1/2">
                <FaMapMarkerAlt size={18} className="mt-1 text-[#E53E3E] flex-shrink-0" />
                <div>
                  <p className="mb-1 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Location</p>
                  <address className="not-italic text-sm text-slate-600">Robi Mall Baldia Town, Karachi, Pakistan</address>
                </div>
              </div>

              {/* Right: Follow icons and WhatsApp stacked on mobile, aligned to end on larger screens */}
              <div className="flex w-full flex-col items-start gap-3 sm:items-end sm:w-1/2">
                <div className="w-full">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Follow Us</p>
                  <div className="flex items-center gap-4">
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
                </div>

                <div className="flex items-center gap-2">
                  <FaWhatsapp size={18} className="text-[#25D366] flex-shrink-0" />
                  <a href="https://wa.me/923001234567" className="break-words text-sm text-slate-700 hover:text-orange-600">
                    +92 300 1234567
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
