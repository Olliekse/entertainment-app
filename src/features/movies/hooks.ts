import { useQuery } from "@tanstack/react-query";
import { fetchMovies, searchContent } from "@/lib/api";
import { ContentItem } from "@/lib/types";

export function useMovies(type: string, searchTerm?: string) {
  return useQuery({
    queryKey: ["movies", type, searchTerm],
    queryFn: async () => {
      if (searchTerm && searchTerm.trim() !== "") {
        const results = await searchContent(searchTerm, type);
        return results.map((item: any) => ({
          title: item.Title,
          year: item.Year,
          imdbID: item.imdbID,
          type: item.Type,
          poster: item.Poster,
        })) as ContentItem[];
      } else {
        const results = await fetchMovies(type);
        return results.map((item: any) => ({
          title: item.Title,
          year: item.Year,
          imdbID: item.imdbID,
          type: item.Type,
          poster: item.Poster,
        })) as ContentItem[];
      }
    },
    enabled: true,
  });
}
