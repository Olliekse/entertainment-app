/**
 * Recommended Component
 *
 * This component displays a grid of recommended movies and TV series.
 * It randomly selects content from the local data.json file, excluding
 * trending content to provide variety and personalization.
 *
 * Key features:
 * - Randomly selects non-trending content from local data
 * - Uses MediaCard components for consistency
 * - Responsive grid layout
 * - Loading and error states
 * - Memoized for performance
 */

"use client";

import MediaCard from "@/components/ui/MediaCard";
import { ContentItem } from "@/lib/types";
import React, { useMemo } from "react";
import data from "@/lib/data.json";

/**
 * Recommended component that displays randomly selected content
 * @returns JSX.Element - Grid of recommended content cards
 */
function Recommended() {
  // Transform local data to ContentItem format and randomly select recommended content
  const recommendedContent = useMemo(() => {
    try {
      // Filter out trending content and transform to ContentItem format
      const nonTrendingContent = data
        .filter((item) => !item.isTrending)
        .map(
          (item) =>
            ({
              title: item.title,
              year: item.year,
              imdbID: item.title.toLowerCase().replace(/\s+/g, "-"), // Generate a unique ID
              type:
                item.category.toLowerCase() === "movie" ? "movie" : "series",
              poster: `/images/thumbnails/${item.title.toLowerCase().replace(/\s+/g, "-")}/regular/small.jpg`,
              rating: item.rating,
              isBookmarked: item.isBookmarked,
            }) as ContentItem
        );

      // Randomly shuffle the array and take first 6-8 items
      const shuffled = [...nonTrendingContent].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, Math.floor(Math.random() * 3) + 6); // 6-8 items
    } catch (error) {
      console.error("Error processing recommended content:", error);
      return [];
    }
  }, []);

  // Show loading state while processing data
  if (recommendedContent.length === 0) {
    return (
      <div className="pt-[20px] px-4 md:px-0">
        <h1 className="font-light text-xl text-white md:text-[32px]">
          Recommended for you
        </h1>
        <p className="text-white pt-6">Loading recommendations...</p>
      </div>
    );
  }

  return (
    <div className="pt-[24px] md:pt-[37px] xl:pt-[32px] px-4 md:px-0">
      <h1 className="font-light text-xl text-white md:text-[32px] tracking-tight">
        Recommended for you
      </h1>

      {/* Responsive grid layout for recommended content */}
      <div className="pt-5 md:pt-6 xl:pt-8 md:pb-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[15px] gap-y-[8px] md:gap-x-[30px] xl:gap-x-[40px] md:gap-y-[24px] xl:gap-y-[13px]">
        {recommendedContent.map((item) => (
          <MediaCard key={item.imdbID} item={item} />
        ))}
      </div>
    </div>
  );
}

export default React.memo(Recommended);
