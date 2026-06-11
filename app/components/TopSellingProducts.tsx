import Image from "next/image";
import type { Product } from "../../data/content";

type Props = {
  products: Product[];
};

export default function TopSellingProducts({ products }: Props) {
  return (
    <section id="top-selling" className="bg-slate-100 px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.24em] text-orange-600">Top Selling Products</p>
          <h2 className="text-3xl font-semibold ">Best-selling perfumes customers love</h2>
        </div>

        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex gap-6 min-w-max animate-today-deals">
            {[...products, ...products].map((product, idx) => (
              <article key={`${product.id}-${idx}`} className="min-w-[260px] rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="overflow-hidden rounded-3xl">
                  <Image src={product.image} alt={product.title} width={720} height={480} className="h-56 w-full object-cover" />
                </div>
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-base font-semibold text-slate-950">{product.title}</p>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      {product.discount}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">{product.subtitle}</p>
                  <div className="flex items-center gap-2 text-lg font-semibold text-slate-950">
                    <span>{product.price}</span>
                    {product.oldPrice ? <small className="text-sm font-normal text-slate-400 line-through">{product.oldPrice}</small> : null}
                  </div>
                  <button className="mt-4 w-full rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
