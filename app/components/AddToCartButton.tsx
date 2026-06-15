"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import type { Product } from "../../data/content";

type Props = {
  product: Product;
  className?: string;
};

export default function AddToCartButton({ product, className }: Props) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`${className ?? "w-full rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"}`}
    >
      {added ? "Added" : "Add to Cart"}
    </button>
  );
}
