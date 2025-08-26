import SearchBar from "@/components/SearchBar";
import TrendingCarousel from "@/components/TrendingCarousel";
import Recommended from "@/components/Recommended";

export default function Home() {
  return (
    <div className="px-4 md:px-0">
      <SearchBar />
      <TrendingCarousel />
      <Recommended />
    </div>
  );
}
