"use client";

import { useState } from "react";
import type { Product } from "../../../data/content";

const WHATSAPP_NUMBER = "923231835011";

type Props = {
  product: Product;
};

export default function WhatsAppBuyButton({ product }: Props) {
  const [quantity, setQuantity] = useState(1);

  const handleBuy = () => {
    // Calculate total price (strip non-numeric chars for calculation)
    const rawPrice = product.price.replace(/[^0-9.]/g, "");
    const unitPrice = parseFloat(rawPrice) || 0;
    const total = unitPrice * quantity;

    const formattedTotal = new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(total);

    const message = [
      "🛍️ *Order Inquiry – Scent Steller*",
      "",
      "📦 *Product Details:*",
      `• Name: ${product.title}`,
      product.subtitle ? `• Range: ${product.subtitle}` : null,
      product.volume   ? `• Volume: ${product.volume}`   : null,
      product.category ? `• Category: ${product.category.toUpperCase()}` : null,
      `• Unit Price: ${product.price}`,
      product.oldPrice ? `• Original Price: ${product.oldPrice}` : null,
      product.discount ? `• Discount: ${product.discount}` : null,
      "",
      `🔢 *Quantity:* ${quantity}`,
      "",
      `💰 *Total Amount: ${formattedTotal}*`,
      "",
      "Please confirm availability and guide me for payment. Thank you! 🙏",
    ]
      .filter((line) => line !== null)
      .join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Quantity
        </span>
        <div className="flex items-center overflow-hidden rounded-full border border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-4 py-2 text-lg font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-95"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="min-w-[40px] text-center text-sm font-bold text-slate-900">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="px-4 py-2 text-lg font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-95"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Buy via WhatsApp Button */}
      <button
        type="button"
        onClick={handleBuy}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-[#1ebe5d] hover:shadow-lg active:scale-[0.98]"
      >
        {/* WhatsApp icon */}
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 .02 5.35.02 12c0 2.11.55 4.17 1.6 5.97L0 24l6.3-1.65A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.48-8.52zm-8.1 18.15c-1.9 0-3.77-.5-5.37-1.45l-.38-.22-3.74.98.99-3.64-.24-.38A9.82 9.82 0 012.2 12c0-5.43 4.41-9.84 9.84-9.84 2.63 0 5.11 1.02 6.97 2.89a9.78 9.78 0 012.88 6.95c0 5.43-4.42 9.84-9.84 9.84zm5.34-7.47c-.29-.15-1.71-.84-1.98-.93-.27-.1-.47-.15-.67.15-.2.29-.78.93-.96 1.12-.18.2-.35.22-.64.08-.29-.15-1.23-.45-2.34-1.44-.87-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.58c-.2 0-.52.08-.79.37-.27.29-1.05 1.03-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.13 3.35 5.17 4.7.72.31 1.28.5 1.72.64.72.24 1.38.21 1.9.13.58-.09 1.7-.69 1.94-1.36.24-.67.24-1.25.17-1.36-.08-.1-.3-.15-.62-.29z" />
        </svg>
        Buy via WhatsApp
      </button>
    </div>
  );
}
