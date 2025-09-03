/**
 * API Utilities for OMDB Integration
 *
 * This file contains all the API functions for interacting with the OMDB (Open Movie Database) API.
 * OMDB provides movie and TV series data including titles, years, posters, and ratings.
 *
 * Key features:
 * - Fetch movies and TV series by type
 * - Search content by query string
 * - Fetch detailed content by IMDB ID
 * - Error handling and response validation
 *
 * Environment variables required:
 * - NEXT_PUBLIC_OMDB_KEY: Your OMDB API key
 * - NEXT_PUBLIC_OMDB_URL: OMDB API base URL
 */

// API configuration from environment variables
const API_KEY = process.env.NEXT_PUBLIC_OMDB_KEY!;
const BASE_URL = process.env.NEXT_PUBLIC_OMDB_URL!;

/**
 * Fetches movies from OMDB API based on type (movie, series, episode)
 * @param type - The type of content to fetch ("movie", "series", "episode")
 * @returns Promise<Array> - Array of movie objects
 * @throws Error - If API request fails or no movies found
 */
export async function fetchMovies(type: string) {
  try {
    // Make API request to OMDB with search parameters
    const res = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=movie&type=${type}`
    );

    // Check if HTTP request was successful
    if (!res.ok) throw new Error("Failed to fetch movies");

    // Parse JSON response
    const data = await res.json();

    // Check if OMDB API returned an error response
    if (data.Response === "False") {
      throw new Error(data.Error || "No movies found");
    }

    // Return search results or empty array if none found
    return data.Search || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}

/**
 * Fetches TV series from OMDB API based on type
 * @param type - The type of content to fetch ("movie", "series", "episode")
 * @returns Promise<Array> - Array of TV series objects
 * @throws Error - If API request fails or no TV series found
 */
export async function fetchTVSeries(type: string) {
  try {
    // Make API request to OMDB for series content
    const res = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=series&type=${type}`
    );

    // Check if HTTP request was successful
    if (!res.ok) throw new Error("Failed to fetch TV series");

    // Parse JSON response
    const data = await res.json();

    // Check if OMDB API returned an error response
    if (data.Response === "False") {
      throw new Error(data.Error || "No TV series found");
    }

    // Filter results to only include series type and return
    const results = data.Search || [];
    return results.filter((item: { Type: string }) => item.Type === "series");
  } catch (error) {
    console.error("Error fetching TV series:", error);
    throw error;
  }
}

/**
 * Searches for content (movies/TV series) by query string
 * @param query - Search query string
 * @param type - The type of content to search for
 * @returns Promise<Array> - Array of search results
 * @throws Error - If API request fails or no results found
 */
export async function searchContent(query: string, type: string) {
  try {
    // Make API request with search query and type
    const res = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=${type}`
    );

    // Check if HTTP request was successful
    if (!res.ok) throw new Error("Failed to search content");

    // Parse JSON response
    const data = await res.json();

    // Check if OMDB API returned an error response
    if (data.Response === "False") {
      throw new Error(data.Error || "No results found");
    }

    // Return search results or empty array if none found
    return data.Search || [];
  } catch (error) {
    console.error("Error searching content:", error);
    throw error;
  }
}

/**
 * Fetches detailed content information by IMDB ID
 * @param imdbId - The IMDB ID of the content
 * @returns Promise<Object> - Detailed content information
 * @throws Error - If API request fails or content not found
 */
export async function fetchContentById(imdbId: string) {
  try {
    // Make API request using IMDB ID for detailed information
    const res = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(imdbId)}`
    );

    // Check if HTTP request was successful
    if (!res.ok) throw new Error("Failed to fetch content by ID");

    // Parse JSON response
    const data = await res.json();

    // Check if OMDB API returned an error response
    if (data.Response === "False") {
      throw new Error(data.Error || "Content not found");
    }

    // Return detailed content information
    return data;
  } catch (error) {
    console.error("Error fetching content by ID:", error);
    throw error;
  }
}
