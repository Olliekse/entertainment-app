"use client";

import SearchBar from "@/components/features/SearchBar";
import TrendingCarousel from "@/components/features/TrendingCarousel";
import Recommended from "@/components/features/Recommended";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className="">
      <SearchBar
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        placeholderText="Search for movies or TV series"
      />
      {!searchTerm ? (
        <>
          <TrendingCarousel />
          <Recommended />
        </>
      ) : (
        <p className="font-light text-[20px] leading-[6.25%] text-white md:text-[32px]">
          Found X results for {searchTerm}
        </p>
      )}
    </div>
  );
}
