"use client";

import SearchBar from "@/components/features/SearchBar";
import MediaCard from "@/components/ui/MediaCard";
import { useState } from "react";
import { useMovies } from "@/features/movies/hooks";

export default function Movies() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const {
    data: movies,
    isLoading,
    isError,
    error,
  } = useMovies("movie", searchTerm);

  return (
    <div className="px-4 md:px-0">
      <SearchBar
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        placeholderText="Search for movies"
      />

      {!searchTerm ? (
        <>
          <h1 className="font-light text-[20px] text-white md:text-[32px] mb-6">
            Movies
          </h1>
          {isLoading && <p className="text-white">Loading movies...</p>}
          {isError && (
            <div className="text-red-500 mb-4">
              <p>Error loading movies:</p>
              <p className="text-sm">{error?.message || "Unknown error"}</p>
            </div>
          )}
          {movies && movies.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
              {movies.map((movie) => (
                <MediaCard key={movie.imdbID} item={movie} />
              ))}
            </div>
          )}
          {!isLoading && !isError && (!movies || movies.length === 0) && (
            <p className="text-white">No movies available.</p>
          )}
        </>
      ) : (
        <>
          <p className="font-light text-[20px] leading-[6.25%] text-white md:text-[32px] mb-6">
            Found {movies?.length || 0} results for &ldquo;{searchTerm}&rdquo;
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
              No movies found for &ldquo;{searchTerm}&rdquo;
            </p>
          )}
        </>
      )}
    </div>
  );
}
