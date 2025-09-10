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
import { useMovies } from "@/features/movies/hooks";
import MediaCard from "@/components/ui/MediaCard";
import useDebounce from "@/features/search-bar/useDebounce";

/**
 * Home page component that serves as the main dashboard
 * @returns JSX.Element - Home page with search, trending, and recommended content
 */
export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  // Debounce the search term with 300ms delay
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const {
    data: movies,
    isLoading,
    isError,
    error,
  } = useMovies("movie", debouncedSearchTerm);

  return (
    <div>
      <SearchBar
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        placeholderText="Search for movies or TV series"
      />

      {!debouncedSearchTerm ? (
        <>
          <TrendingCarousel />
          <Recommended />
        </>
      ) : (
        <>
          <p className="font-light text-[20px] leading-[6.25%] text-white md:text-[32px] mb-6">
            Found {movies?.length || 0} results for &ldquo;{debouncedSearchTerm}
            &rdquo;
          </p>
          {isLoading && <p className="text-white">Searching...</p>}
          {isError && (
            <div className="text-red-500 mb-4">
              <p>Error searching movies:</p>
              <p className="text-sm">{error?.message || "Unknown error"}</p>
            </div>
          )}
          {movies && movies.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {movies.map((movie) => (
                <MediaCard key={movie.imdbID} item={movie} />
              ))}
            </div>
          )}
          {!isLoading && !isError && (!movies || movies.length === 0) && (
            <p className="text-white">
              No movies found for &ldquo;{debouncedSearchTerm}&rdquo;
            </p>
          )}
        </>
      )}
    </div>
  );
}
