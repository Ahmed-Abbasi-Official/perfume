"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { cart, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const [open, setOpen] = useState(false);

  const whatsappNumber = "923231835011";

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const itemLines = cart.map(
      (item, i) =>
        `${i + 1}. ${item.title} × ${item.quantity} — ${item.price} each`
    );

    const message = [
      "🛍️ *Order – Scent Steller*",
      "",
      "📦 *Items Ordered:*",
      ...itemLines,
      "",
      "📊 *Order Summary:*",
      `• Total Items: ${totalItems}`,
      `• Total Amount: ${new Intl.NumberFormat("en-PK", {
        style: "currency",
        currency: "PKR",
        maximumFractionDigits: 0,
      }).format(totalPrice)}`,
      "",
      "Please confirm my order and guide me for payment. Thank you! 🙏",
    ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
      >
        Cart{totalItems > 0 ? ` (${totalItems})` : ""}
      </button>

      <div className={`fixed inset-0 z-50 transition-all ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="absolute inset-0 bg-slate-950/40" onClick={() => setOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-2xl sm:w-[420px]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-950">Your Cart</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700"
            >
              Close
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="mt-8 rounded-3xl bg-slate-50 p-6 text-sm text-slate-600">
              Your cart is empty. Add something from the product page.
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="rounded-3xl border border-slate-200 p-4">
                    <div className="flex items-start gap-4">
                      <div className="min-w-[60px] overflow-hidden rounded-2xl">
                        <img src={item.image} alt={item.title} className="h-16 w-16 object-cover" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-semibold text-slate-900">{item.title}</p>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-600"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-sm text-slate-600">{item.price}</p>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm font-semibold"
                          >
                            -
                          </button>
                          <span className="min-w-[24px] text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm font-semibold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Total items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-lg font-semibold text-slate-950">
                  <span>Total</span>
                  <span>{new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(totalPrice)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  Clear Cart
                </button>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
