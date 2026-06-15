import Image from "next/image";
import { products } from "../../../data/content";
import type { Metadata } from "next";
import ImageGallery from "./ImageGallery";
import AddToCartButton from "../../components/AddToCartButton";
import WhatsAppBuyButton from "./WhatsAppBuyButton";

type Props = {
  params: {
    id: string;
  };
};



export async function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  return {
    title: product ? `${product.title} | Scent Steller` : "Product | Scent Steller",
    description: product?.subtitle || "Explore our premium perfume collection.",
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-24 text-center text-slate-900">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <p className="text-xl font-semibold">Product not found</p>
          <p className="mt-3 text-sm text-slate-600">Please go back to browse our collection.</p>
        </div>
      </main>
    );
  }


  const galleryImages =
    product.images ?? [
      product.image,
      product.image,
      product.image,
    ];

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr] items-start">
            <div>
              <ImageGallery images={galleryImages} title={product.title} />
            </div>

            <div className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">Product details</p>
                  <h1 className="text-3xl font-semibold text-slate-950">{product.title}</h1>
                  <p className="text-lg text-slate-600">{product.subtitle}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-slate-950">
                  {product.volume && <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">{product.volume}</span>}
                  <span className="text-lg font-semibold text-amber-700">{product.category?.toUpperCase()}</span>
                  {product.badge ? <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">{product.badge}</span> : null}
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Price</p>
                      <p className="mt-2 text-4xl font-semibold text-amber-700">{product.price}</p>
                      {product.oldPrice ? <p className="text-sm text-slate-400 line-through">{product.oldPrice}</p> : null}
                    </div>
                    {product.discount ? <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">{product.discount}</span> : null}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Quick specs</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    <li>{product.volume ? `Volume: ${product.volume}` : "Volume: N/A"}</li>
                    <li>{product.category ? `Category: ${product.category}` : "Category: N/A"}</li>
                    {product.discount ? <li>Offer: {product.discount}</li> : null}
                  </ul>
                </div>

                <div className="space-y-3">
                  <AddToCartButton
                    product={product}
                    className="w-full rounded-full bg-slate-950 px-5 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                  />
                  <WhatsAppBuyButton product={product} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Description</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {product.description ||
                "This carefully curated fragrance is crafted for a luxurious experience. Enjoy rich top notes, long-lasting performance, and a timeless finish that makes every impression unforgettable."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
