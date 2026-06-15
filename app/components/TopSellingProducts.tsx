import Image from "next/image";
import Link from "next/link";
import type { Product } from "../../data/content";

type Props = {
  products: Product[];
};

export default function TopSellingProducts({ products }: Props) {
  return (
    <section id="top-selling" className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange-600">Top Selling Products</p>
          <h2 className="sm:text-3xl text-2xl font-bold">Signature Favorites</h2>
        </div>
        {/* Horizontal scroll container */}
        <div className="thin-scrollbar flex flex-nowrap gap-4 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group block flex-none w-[48vw] sm:w-[240px] md:w-[265px] lg:w-[295px]">
              <article className="h-full rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col overflow-hidden justify-between">
                <div className="relative overflow-hidden w-full aspect-[4/5] bg-slate-50 shrink-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 flex flex-col gap-1 sm:p-4 sm:gap-2">
                  <h3 className="text-sm font-semibold text-slate-950 group-hover:text-orange-600 transition-colors line-clamp-1 sm:text-base">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 sm:text-sm">{product.subtitle}</p>
                  {product.volume && <p className="text-xs text-amber-700 font-medium">{product.volume}</p>}
                  <div className="flex flex-wrap items-center gap-1 sm:gap-3 mt-1">
                    <span className="text-base font-semibold text-slate-950 sm:text-lg">{product.price}</span>
                    {product.oldPrice && (
                      <small className="text-xs font-normal text-slate-400 line-through sm:text-sm">{product.oldPrice}</small>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
