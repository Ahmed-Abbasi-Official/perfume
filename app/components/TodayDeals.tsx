import Image from "next/image";
import type { Product } from "../../data/content";

type Props = {
  deals: Product[];
};

export default function TodayDeals({ deals }: Props) {
  return (
    <section id="today-deals" className="bg-slate-100 px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.24em] text-amber-700">Today Deals</p>
          <h2 className="text-3xl font-semibold text-slate-950">Deals to grab before they disappear</h2>
        </div>

        <div className="overflow-hidden">
          <div className="flex flex-nowrap gap-6 px-0 sm:px-2 animate-today-deals">
            {[...deals, ...deals].map((deal, idx) => (
              <article
                key={`${deal.id}-${idx}`}
                className="flex-shrink-0 min-w-[260px] sm:min-w-[300px] md:min-w-[340px] lg:min-w-[360px] rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative overflow-hidden rounded-3xl">
                  <Image src={deal.image} alt={deal.title} width={720} height={480} className="h-60 w-full object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-amber-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                    {deal.badge}
                  </span>
                </div>
                <div className="mt-5 space-y-3">
                  <p className="text-sm font-semibold text-slate-900">{deal.title}</p>
                  <p className="text-sm text-slate-500">{deal.subtitle}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-semibold text-slate-950">{deal.price}</p>
                    {deal.oldPrice ? <p className="text-sm text-slate-400 line-through">{deal.oldPrice}</p> : null}
                  </div>
                  <p className="text-sm text-amber-700">{deal.discount}</p>
                  <div className="mt-4 rounded-2xl bg-slate-100 px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-600">
                    Ends soon
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
