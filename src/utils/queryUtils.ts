import { useQueryClient } from "@tanstack/react-query";

export function useInvalidateQueries() {
  const queryClient = useQueryClient();

  const invalidateBookmarks = () => {
    queryClient.invalidateQueries({ queryKey: ["bookmarkedMovies"] });
    queryClient.invalidateQueries({ queryKey: ["bookmarkedSeries"] });
  };

  const invalidateSearch = () => {
    queryClient.invalidateQueries({ queryKey: ["movies"] });
    queryClient.invalidateQueries({ queryKey: ["series"] });
  };

  const invalidateAll = () => {
    queryClient.invalidateQueries();
  };

  return {
    invalidateBookmarks,
    invalidateSearch,
    invalidateAll,
  };
}
