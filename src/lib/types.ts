/**
 * TypeScript Type Definitions
 *
 * This file contains all the TypeScript interfaces and types used throughout
 * the entertainment application. These types ensure type safety and provide
 * better developer experience with autocomplete and error checking.
 *
 * The types are organized by their purpose:
 * - Movie: Internal movie data structure
 * - OMDBMovie/OMDBResponse: External API response types
 * - ContentItem: Unified content representation
 */

/**
 * Movie interface representing the internal movie data structure
 * Used for displaying movies in the application with all necessary metadata
 */
export interface Movie {
  title: string; // Movie title
  thumbnail: {
    trending?: {
      small: string; // Small trending thumbnail URL
      large: string; // Large trending thumbnail URL
    };
    regular: {
      small: string; // Small regular thumbnail URL
      medium: string; // Medium regular thumbnail URL
      large: string; // Large regular thumbnail URL
    };
  };
  year: number; // Release year
  category: string; // Movie category (e.g., "Movie", "TV Series")
  rating: string; // Content rating (e.g., "PG", "R")
  isBookmarked: boolean; // Whether user has bookmarked this movie
  isTrending: boolean; // Whether movie is currently trending
}

/**
 * OMDBMovie interface representing movie data from OMDB API
 * This matches the exact structure returned by the external OMDB API
 */
export interface OMDBMovie {
  Title: string; // Movie title from API
  Year: string; // Release year as string
  imdbID: string; // Unique IMDB identifier
  Type: string; // Content type (movie, series, episode)
  Poster: string; // Movie poster URL
}

/**
 * OMDBResponse interface representing the complete API response
 * Used when fetching multiple movies from OMDB API
 */
export interface OMDBResponse {
  Search: OMDBMovie[]; // Array of movies from search results
  totalResults: string; // Total number of results available
  Response: string; // API response status ("True" or "False")
  Error?: string; // Error message if request failed
}

/**
 * ContentItem interface representing unified content structure
 * Used internally to standardize movie and TV series data
 */
export interface ContentItem {
  title: string; // Content title
  year: string; // Release year
  imdbID: string; // Unique identifier
  type: string; // Content type
  poster: string; // Poster image URL
}
