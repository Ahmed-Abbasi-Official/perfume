import Image from "next/image";
import type { Article } from "../../data/content";

type Props = {
  articles: Article[];
};

export default function ArticlesSection({ articles }: Props) {
  return (
    <section id="articles" className="bg-slate-50 px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Insights & Guides</p>
            <h2 className="text-3xl font-semibold text-slate-950">Read perfume stories and tips</h2>
          </div>
          <p className="text-sm text-slate-600">
            {articles.length} curated articles for your fragrance journey.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {articles.slice(0, 30).map((article) => (
            <article key={article.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="overflow-hidden rounded-3xl">
                <Image src={article.image} alt={article.title} width={720} height={480} className="h-52 w-full object-cover" />
              </div>
              <div className="mt-5 space-y-3">
                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                  {article.type}
                </span>
                <h3 className="text-lg font-semibold text-slate-950">{article.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{article.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
