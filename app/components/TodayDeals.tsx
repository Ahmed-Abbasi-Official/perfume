import Image from "next/image";
import Link from "next/link";
import type { Product } from "../../data/content";

type Props = {
  deals: Product[];
};

export default function TodayDeals({ deals }: Props) {
  // No scrolling, simple grid layout
  return (
    <section id="today-deals" className="bg-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-700">Today Deals</p>
          <h2 className="md:text-3xl text-2xl font-bold text-slate-950">Exclusive Fragrance Offers</h2>
        </div>
        <div className="thin-scrollbar flex flex-nowrap gap-4 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          {deals.map((deal) => (
            <Link key={deal.id} href={`/product/${deal.id}`} className="group block flex-none w-[48vw] sm:w-[240px] md:w-[265px] lg:w-[295px]">
              <article className="h-full rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col overflow-hidden justify-between">
                <div className="relative overflow-hidden w-full aspect-[4/5] bg-slate-50 shrink-0">
                  <Image src={deal.image} alt={deal.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-2 top-2 rounded-full bg-amber-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs">
                    {deal.badge}
                  </span>
                </div>
                <div className="p-3 flex flex-col gap-1 sm:p-4 sm:gap-2">
                  <p className="text-sm font-semibold text-slate-950 line-clamp-1 sm:text-base">{deal.title}</p>
                  <p className="text-xs text-slate-500 line-clamp-1 sm:text-sm">{deal.subtitle}</p>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-3">
                    <p className="text-base font-semibold text-slate-950 sm:text-lg">{deal.price}</p>
                    {deal.oldPrice && <p className="text-xs text-slate-400 line-through sm:text-sm">{deal.oldPrice}</p>}
                    {deal.discount && <p className="text-xs text-amber-700 sm:text-sm">{deal.discount}</p>}
                  </div>
                  <div className="mt-2 rounded-2xl bg-slate-100 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-600 sm:mt-4 sm:px-3 sm:py-2 sm:text-xs">
                    Ends soon
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
