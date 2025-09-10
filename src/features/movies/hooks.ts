import { useQuery } from "@tanstack/react-query";
import { fetchMovies, searchContent } from "@/lib/api";
import { ContentItem } from "@/lib/types";

export function useMovies(type: string, searchTerm?: string) {
  return useQuery({
    queryKey: ["movies", type, searchTerm],
    queryFn: async () => {
      if (searchTerm && searchTerm.trim() !== "") {
        const results = await searchContent(searchTerm, type);
        return results.map(
          (item: {
            Title: string;
            Year: string;
            imdbID: string;
            Type: string;
            Poster: string;
          }) => ({
            title: item.Title,
            year: item.Year,
            imdbID: item.imdbID,
            type: item.Type,
            poster: item.Poster,
          })
        ) as ContentItem[];
      } else {
        const results = await fetchMovies(type);
        return results.map(
          (item: {
            Title: string;
            Year: string;
            imdbID: string;
            Type: string;
            Poster: string;
          }) => ({
            title: item.Title,
            year: item.Year,
            imdbID: item.imdbID,
            type: item.Type,
            poster: item.Poster,
          })
        ) as ContentItem[];
      }
    },
    enabled: true,
    staleTime: searchTerm ? 1000 * 60 * 2 : 1000 * 60 * 10, // 2 min for search, 10 min for regular
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
}
