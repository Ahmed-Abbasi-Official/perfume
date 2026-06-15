import { products } from "../../data/content";
import ProductsListClient from "./ProductsListClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products | Scent Steller",
  description: "Browse our complete range of premium and luxury fragrances. Filter by range, gender, and genre to find your signature scent.",
  openGraph: {
    title: "All Products | Scent Steller",
    description: "Browse our complete range of premium and luxury fragrances.",
  },
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <ProductsListClient products={products} />
    </div>
  );
}
