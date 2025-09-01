"use client";

import SearchBar from "@/components/features/SearchBar";
import MediaCard from "@/components/ui/MediaCard";
import { useState } from "react";
import { useSeries } from "@/features/tv-series/hooks";

export default function Series() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: series, isLoading, isError, error } = useSeries(searchTerm);

  return (
    <div className="px-4 md:px-0">
      <SearchBar
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        placeholderText="Search for TV series"
      />
      {!searchTerm ? (
        <>
          <h1 className="font-light text-[20px] text-white md:text-[32px] mb-6">
            TV Series
          </h1>
          {isLoading && <p className="text-white">Loading series...</p>}
          {isError && (
            <div className="text-red-500 mb-4">
              <p>Error loading series:</p>
              <p className="text-sm">{error?.message || "Unknown error"}</p>
            </div>
          )}
          {series && series.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
              {series.map((seriesItem) => (
                <MediaCard key={seriesItem.imdbID} item={seriesItem} />
              ))}
            </div>
          )}
          {!isLoading && !isError && (!series || series.length === 0) && (
            <p className="text-white">
              No series available. Check console for debugging info.
            </p>
          )}
        </>
      ) : (
        <>
          <p className="font-light text-[20px] leading-[6.25%] text-white md:text-[32px] mb-6">
            Found {series?.length || 0} results for &ldquo;{searchTerm}&rdquo;
          </p>
          {isLoading && <p className="text-white">Searching...</p>}
          {isError && (
            <div className="text-red-500 mb-4">
              <p>Error searching series:</p>
              <p className="text-sm">{error?.message || "Unknown error"}</p>
            </div>
          )}
          {series && series.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
              {series.map((seriesItem) => (
                <MediaCard key={seriesItem.imdbID} item={seriesItem} />
              ))}
            </div>
          )}
          {!isLoading && !isError && (!series || series.length === 0) && (
            <p className="text-white">
              No series found for &ldquo;{searchTerm}&rdquo;
            </p>
          )}
        </>
      )}
    </div>
  );
}
