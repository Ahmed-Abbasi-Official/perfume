import type { Review } from "../../data/content";

type Props = {
  reviews: Review[];
};

export default function CustomerReviews({ reviews }: Props) {
  return (
    <section className="px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.24em] text-orange-600">Customer Reviews</p>
          <h2 className="text-3xl font-semibold text-slate-950">What people are saying</h2>
        </div>

        <div className="overflow-x-auto hide-scrollbar group">
          <div className="flex gap-6 min-w-max animate-today-deals">
            {[...reviews, ...reviews, ...reviews].map((review, idx) => (
              <article key={`${review.id}-${idx}`} className="min-w-[300px] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-lg font-semibold text-slate-950">{review.name}</p>
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index}>{index < review.rating ? "★" : "☆"}</span>
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">“{review.text}”</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
