/**
 * Home Page Component
 *
 * This is the main dashboard page that users see after logging in.
 * It displays trending content, recommended content, and provides search functionality.
 *
 * Key features:
 * - Search bar for filtering content
 * - Trending movies carousel
 * - Recommended content section
 * - Conditional rendering based on search state
 * - Responsive design
 */

"use client";

import SearchBar from "@/components/features/SearchBar";
import TrendingCarousel from "@/components/features/TrendingCarousel";
import Recommended from "@/components/features/Recommended";
import { useState } from "react";

/**
 * Home page component that serves as the main dashboard
 * @returns JSX.Element - Home page with search, trending, and recommended content
 */
export default function Home() {
  // State to manage search term for filtering content
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className="">
      {/* Search bar for filtering content */}
      <SearchBar
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        placeholderText="Search for movies or TV series"
      />

      {/* Conditional rendering based on search state */}
      {!searchTerm ? (
        // Show trending and recommended content when no search is active
        <>
          <TrendingCarousel />
          <Recommended />
        </>
      ) : (
        // Show search results placeholder when search term is entered
        <p className="font-light text-[20px] leading-[6.25%] text-white md:text-[32px]">
          Found X results for {searchTerm}
        </p>
      )}
    </div>
  );
}
