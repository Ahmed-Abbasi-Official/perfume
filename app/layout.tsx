import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://www.scentsteller.pk"; // <-- apna domain yahan daal

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a0a00",
};

export const metadata: Metadata = {
  // ─── Core ────────────────────────────────────────────────────────────────
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Scent Steller | Luxury Perfumes in Karachi, Pakistan",
    template: "%s | Scent Steller",
  },
  description:
    "Discover premium & luxury fragrances at Scent Steller — Karachi's finest perfume store. Shop bestsellers, exclusive deals & new arrivals at Rubi Cinema Mall, Baldia Town, Karachi.",
  keywords: [
    "perfume store karachi",
    "luxury perfume pakistan",
    "buy perfume karachi",
    "scent steller",
    "fragrance shop karachi",
    "baldia town perfume",
    "rubi cinema mall shops",
    "best perfume pakistan",
    "oud perfume karachi",
    "arabic perfume shop karachi",
  ],
  authors: [{ name: "Scent Steller", url: BASE_URL }],
  creator: "Scent Steller",
  publisher: "Scent Steller",
  category: "shopping",

  // ─── Canonical ───────────────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ─── Robots ──────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ─── Open Graph ──────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: BASE_URL,
    siteName: "Scent Steller",
    title: "Scent Steller | Luxury Perfumes in Karachi, Pakistan",
    description:
      "Karachi's premium fragrance destination. Explore luxury perfumes, bestsellers & exclusive deals at our store in Rubi Cinema Mall, Baldia Town.",
    images: [
      {
        url: "/og-image.jpg", // 1200x630 image /public mein rakh
        width: 1200,
        height: 630,
        alt: "Scent Steller – Luxury Perfume Store Karachi",
        type: "image/jpeg",
      },
    ],
  },

  // ─── Twitter / X Card ────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Scent Steller | Luxury Perfumes in Karachi",
    description:
      "Shop premium fragrances at Karachi's finest perfume store — Rubi Cinema Mall, Baldia Town.",
    images: ["/og-image.jpg"],
    // creator: "@scentsteller",   // agar twitter/X handle hy tu uncomment karo
  },

  // ─── Icons ───────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  // ─── App / PWA ───────────────────────────────────────────────────────────
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Scent Steller",
  },

  // ─── Verification (add keys when ready) ──────────────────────────────────
  verification: {
    // google: "YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN",
    // yandex: "YOUR_YANDEX_TOKEN",
  },

  // ─── Format Detection ────────────────────────────────────────────────────
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

// ─── JSON-LD Structured Data (LocalBusiness + Store) ─────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "Store"],
      "@id": `${BASE_URL}/#business`,
      name: "Scent Steller",
      alternateName: "Scent Stellar Perfume Store",
      description:
        "Luxury and premium fragrance store in Karachi, Pakistan offering a curated selection of perfumes, colognes, and oud.",
      url: BASE_URL,
      telephone: "+92-XXX-XXXXXXX", // <-- apna number daal
      email: "info@scentsteller.pk", // <-- apni email
      priceRange: "$$",
      currenciesAccepted: "PKR",
      paymentAccepted: "Cash, Credit Card, Debit Card",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Shop# UG131, Rubi Cinema & Shopping Mall, Baldia Town Sector 5 Saeedabad",
        addressLocality: "Karachi",
        addressRegion: "Sindh",
        postalCode: "75760",
        addressCountry: "PK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 24.8918,   // <-- exact coordinates Google Maps se le lo
        longitude: 66.9791,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
          opens: "11:00",
          closes: "22:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Friday"],
          opens: "14:00",
          closes: "22:00",
        },
      ],
      image: [`${BASE_URL}/og-image.jpg`],
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/icon-512.png`,
      },
      sameAs: [
        // "https://www.instagram.com/scentsteller",  // social links yahan
        // "https://www.facebook.com/scentsteller",
      ],
      hasMap: "https://maps.google.com/?q=Rubi+Cinema+Mall+Baldia+Town+Karachi",
      areaServed: {
        "@type": "City",
        name: "Karachi",
      },
      servesCuisine: undefined, // N/A for retail
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Scent Steller",
      description: "Luxury perfume store in Karachi, Pakistan",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Geo meta tags for local SEO */}
        <meta name="geo.region" content="PK-SD" />
        <meta name="geo.placename" content="Karachi, Sindh, Pakistan" />
        <meta name="geo.position" content="24.8918;66.9791" />
        <meta name="ICBM" content="24.8918, 66.9791" />

        {/* Language + region */}
        <meta httpEquiv="content-language" content="en-PK" />
      </head>
      <body className="min-h-full overflow-x-hidden bg-slate-50 text-slate-900">
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-white focus:text-slate-900 focus:rounded focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>

        <CartProvider>
          <Navbar />

          <a
            href="https://wa.me/923231835011"
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed right-4 bottom-16 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-slate-900/20 transition duration-200 hover:-translate-y-1 hover:shadow-slate-900/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
              <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 .02 5.35.02 12c0 2.11.55 4.17 1.6 5.97L0 24l6.3-1.65A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.48-8.52zm-8.1 18.15c-1.9 0-3.77-.5-5.37-1.45l-.38-.22-3.74.98.99-3.64-.24-.38A9.82 9.82 0 012.2 12c0-5.43 4.41-9.84 9.84-9.84 2.63 0 5.11 1.02 6.97 2.89a9.78 9.78 0 012.88 6.95c0 5.43-4.42 9.84-9.84 9.84zm5.34-7.47c-.29-.15-1.71-.84-1.98-.93-.27-.1-.47-.15-.67.15-.2.29-.78.93-.96 1.12-.18.2-.35.22-.64.08-.29-.15-1.23-.45-2.34-1.44-.87-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.58c-.2 0-.52.08-.79.37-.27.29-1.05 1.03-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.13 3.35 5.17 4.7.72.31 1.28.5 1.72.64.72.24 1.38.21 1.9.13.58-.09 1.7-.69 1.94-1.36.24-.67.24-1.25.17-1.36-.08-.1-.3-.15-.62-.29z" />
            </svg>
          </a>

          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}