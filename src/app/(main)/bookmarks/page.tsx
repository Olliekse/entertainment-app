"use client";

import SearchBar from "@/components/features/SearchBar";

import { useState, useMemo } from "react";
import MediaCard from "@/components/ui/MediaCard";
import { useBookmarksStore } from "@/features/bookmarks/useBookmarksStore";
import { useMovies } from "@/features/movies/hooks";
import { useSeries } from "@/features/tv-series/hooks";
import { useQuery } from "@tanstack/react-query";
import { fetchContentById } from "@/lib/api";
import { ContentItem } from "@/lib/types";

export default function Bookmarks() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { bookmarks } = useBookmarksStore();

  const memoizedBookmarks = useMemo(() => bookmarks, [bookmarks]);

  const {
    data: searchMovies,
    isLoading: isLoadingSearchMovies,
    isError: isErrorSearchMovies,
  } = useMovies("movie", searchTerm);

  const {
    data: searchSeries,
    isLoading: isLoadingSearchSeries,
    isError: isErrorSearchSeries,
  } = useSeries("series", searchTerm);

  const { data: bookmarkedMoviesData, isLoading: isLoadingBookmarkedMovies } =
    useQuery({
      queryKey: ["bookmarkedMovies", memoizedBookmarks.join(",")],
      queryFn: async () => {
        if (!memoizedBookmarks || memoizedBookmarks.length === 0) return [];

        const moviePromises = memoizedBookmarks.map(async (bookmarkId) => {
          try {
            const movie = await fetchContentById(bookmarkId);
            if (movie && movie.imdbID && movie.Type === "movie") {
              return {
                title: movie.Title,
                year: movie.Year,
                imdbID: movie.imdbID,
                type: movie.Type,
                poster: movie.Poster,
              } as ContentItem;
            }
          } catch (error) {
            console.error(`Failed to fetch movie ${bookmarkId}:`, error);
          }
          return null;
        });

        const results = await Promise.all(moviePromises);
        return results.filter((movie): movie is ContentItem => movie !== null);
      },
      enabled: memoizedBookmarks.length > 0,
      staleTime: 1000 * 60 * 10, // 10 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    });

  const { data: bookmarkedSeriesData, isLoading: isLoadingBookmarkedSeries } =
    useQuery({
      queryKey: ["bookmarkedSeries", memoizedBookmarks.join(",")],
      queryFn: async () => {
        if (!memoizedBookmarks || memoizedBookmarks.length === 0) return [];

        const seriesPromises = memoizedBookmarks.map(async (bookmarkId) => {
          try {
            const series = await fetchContentById(bookmarkId);
            if (series && series.imdbID && series.Type === "series") {
              return {
                title: series.Title,
                year: series.Year,
                imdbID: series.imdbID,
                type: series.Type,
                poster: series.Poster,
              } as ContentItem;
            }
          } catch (error) {
            console.error(`Failed to fetch series ${bookmarkId}:`, error);
          }
          return null;
        });

        const results = await Promise.all(seriesPromises);
        return results.filter(
          (series): series is ContentItem => series !== null,
        );
      },
      enabled: memoizedBookmarks.length > 0,
      staleTime: 1000 * 60 * 10, // 10 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    });

  const displayMovies = searchTerm ? searchMovies : bookmarkedMoviesData;
  const displaySeries = searchTerm ? searchSeries : bookmarkedSeriesData;
  const isLoadingMovies = searchTerm
    ? isLoadingSearchMovies
    : isLoadingBookmarkedMovies;
  const isLoadingSeries = searchTerm
    ? isLoadingSearchSeries
    : isLoadingBookmarkedSeries;
  const isErrorMovies = searchTerm ? isErrorSearchMovies : false;
  const isErrorSeries = searchTerm ? isErrorSearchSeries : false;

  return (
    <div className="px-4 md:px-0">
      <SearchBar
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        placeholderText="Search for bookmarked shows"
      />
      {!searchTerm ? (
        <>
          <div>
            <h1 className="font-light text-[20px] text-white md:text-[32px] mb-6">
              Bookmarked Movies
            </h1>
            {isLoadingMovies && (
              <p className="text-white">Loading bookmarked movies...</p>
            )}
            {isErrorMovies && (
              <div className="text-red-500 mb-4">
                <p>Error loading bookmarked movies:</p>
                <p className="text-sm">Failed to load movies</p>
              </div>
            )}
            {displayMovies && displayMovies.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                {displayMovies.map((movie) => (
                  <MediaCard key={movie.imdbID} item={movie} />
                ))}
              </div>
            )}
            {!isLoadingMovies &&
              !isErrorMovies &&
              (!displayMovies || displayMovies.length === 0) && (
                <p className="text-white">No bookmarked movies available.</p>
              )}
          </div>
          <div>
            <h1 className="font-light text-[20px] text-white md:text-[32px] mb-6">
              Bookmarked TV Series
            </h1>
            {isLoadingSeries && (
              <p className="text-white">Loading bookmarked TV series...</p>
            )}
            {isErrorSeries && (
              <div className="text-red-500 mb-4">
                <p>Error loading bookmarked TV series:</p>
                <p className="text-sm">Failed to load series</p>
              </div>
            )}
            {displaySeries && displaySeries.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                {displaySeries.map((show) => (
                  <MediaCard key={show.imdbID} item={show} />
                ))}
              </div>
            )}
            {!isLoadingSeries &&
              !isErrorSeries &&
              (!displaySeries || displaySeries.length === 0) && (
                <p className="text-white">No bookmarked TV series available.</p>
              )}
          </div>
        </>
      ) : (
        <>
          <p className="font-light text-[20px] leading-[6.25%] text-white md:text-[32px] mb-6">
            Found {(displayMovies?.length || 0) + (displaySeries?.length || 0)}{" "}
            results for &ldquo;{searchTerm}
            &rdquo;
          </p>
          {isLoadingMovies && <p className="text-white">Searching...</p>}
          {isErrorMovies && (
            <div className="text-red-500 mb-4">
              <p>Error searching bookmarked movies:</p>
              <p className="text-sm">Failed to search movies</p>
            </div>
          )}

          {!isLoadingMovies &&
            !isErrorMovies &&
            (!displayMovies || displayMovies.length === 0) && (
              <p className="text-white">
                No bookmarked movies found for &ldquo;{searchTerm}&rdquo;
              </p>
            )}

          {displayMovies && displayMovies.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
              {displayMovies.map((movie) => (
                <MediaCard key={movie.imdbID} item={movie} />
              ))}
            </div>
          )}

          {isLoadingSeries && <p className="text-white">Searching...</p>}
          {isErrorSeries && (
            <div className="text-red-500 mb-4">
              <p>Error searching bookmarked TV series:</p>
              <p className="text-sm">Failed to search series</p>
            </div>
          )}

          {displaySeries && displaySeries.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {displaySeries.map((show) => (
                <MediaCard key={show.imdbID} item={show} />
              ))}
            </div>
          )}

          {!isLoadingSeries &&
            !isErrorSeries &&
            (!displaySeries || displaySeries.length === 0) && (
              <p className="text-white">
                No bookmarked TV Series found for &ldquo;{searchTerm}&rdquo;
              </p>
            )}
        </>
      )}
    </div>
  );
}
