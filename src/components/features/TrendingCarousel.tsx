/**
 * Trending Carousel Component
 *
 * This component displays a horizontal scrollable carousel of trending movies.
 * It fetches movie data from the OMDB API using predefined trending movie IDs
 * and displays them using MediaCard components.
 *
 * Key features:
 * - Fetches trending movies by IMDB IDs
 * - Uses React Query for data fetching and caching
 * - Horizontal scrollable layout
 * - Loading and error states
 * - Optimized caching strategy for trending content
 */

"use client";

import MediaCard from "@/components/ui/MediaCard";
import { fetchContentById } from "@/lib/api";
import { ContentItem } from "@/lib/types";
import React from "react";
import { useQuery } from "@tanstack/react-query";

/**
 * Predefined list of trending movie IMDB IDs
 * These are hardcoded for demonstration purposes
 * In a real app, this would come from an API or CMS
 */
const trendingIds: string[] = [
  "tt4154796", // Avengers: Endgame (2019)
  "tt10872600", // Spider-Man: No Way Home (2021)
  "tt1877830", // The Batman (2022)
];

/**
 * TrendingCarousel component that displays trending movies
 * @returns JSX.Element - Carousel of trending movie cards
 */
function TrendingCarousel() {
  // Use React Query to fetch and cache trending movies
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trending"], // Unique key for caching
    queryFn: async () => {
      // Fetch all trending movies in parallel for better performance
      const moviePromises = trendingIds.map(async (id) => {
        try {
          const movie = await fetchContentById(id);
          // Transform API response to our ContentItem format
          return {
            title: movie.Title,
            year: movie.Year,
            imdbID: movie.imdbID,
            type: movie.Type,
            poster: movie.Poster,
          } as ContentItem;
        } catch (error) {
          console.error(`Failed to fetch movie ${id}:`, error);
          return null; // Return null for failed requests
        }
      });

      // Wait for all requests to complete and filter out failed ones
      const movies = await Promise.all(moviePromises);
      return movies.filter((movie): movie is ContentItem => movie !== null);
    },
    staleTime: 1000 * 60 * 30, // Data is fresh for 30 minutes
    gcTime: 1000 * 60 * 60, // Keep in cache for 1 hour
  });

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="pl-4">
        <h1 className="font-light text-xl text-white md:text-[32px]">
          Trending
        </h1>
        <p className="text-white pt-4">Loading trending content...</p>
      </div>
    );
  }

  // Show error state if data fetching failed
  if (isError || !movies) {
    return (
      <div className="pl-4">
        <h1 className="font-light text-xl text-white md:text-[32px]">
          Trending
        </h1>
        <p className="text-red-500 pt-4">Failed to load trending content</p>
      </div>
    );
  }

  // Render trending movies carousel
  return (
    <div className="pl-4 md:pl-0">
      <h1 className="font-light text-xl text-white md:text-[32px] md:tracking-normal">
        Trending
      </h1>

      {/* Horizontal scrollable container for movie cards */}
      <div className="flex gap-4 md:gap-10 overflow-x-auto pt-4 md:pt-[22px] xl:pt-[25px]">
        {movies.map((movie) => (
          <MediaCard key={movie.imdbID} item={movie} type="trending" />
        ))}
      </div>
    </div>
  );
}

// Memoize component to prevent unnecessary re-renders
export default React.memo(TrendingCarousel);
