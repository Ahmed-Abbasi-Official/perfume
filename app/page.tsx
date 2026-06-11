import HeroSection from "./components/HeroSection";
import TodayDeals from "./components/TodayDeals";
import TopSellingProducts from "./components/TopSellingProducts";
import ArticlesSection from "./components/ArticlesSection";
import CustomerReviews from "./components/CustomerReviews";
import FooterSection from "./components/FooterSection";
import {
  bannerSlides,
  todayDeals,
  topSellingProducts,
  articles,
  customerReviews,
} from "../data/content";
import AllProducts from "./components/AllProducts";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="overflow-hidden">
        <HeroSection slides={bannerSlides} />
        <TodayDeals deals={todayDeals} />
        <TopSellingProducts products={topSellingProducts} />
        <AllProducts products={[...topSellingProducts, ...todayDeals]} />
        {/* <ArticlesSection articles={articles} /> */}
        <CustomerReviews reviews={customerReviews} />
        <FooterSection />
      </main>
    </div>
  );
}
