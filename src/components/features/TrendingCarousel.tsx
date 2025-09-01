import MediaCard from "@/components/ui/MediaCard";
import { fetchContentById } from "@/lib/api";
import { ContentItem } from "@/lib/types";

const trendingIds: string[] = [
  "tt4154796", // Avengers: Endgame (2019)
  "tt10872600", // Spider-Man: No Way Home (2021)
  "tt1877830", // The Batman (2022)
];

export default async function TrendingCarousel() {
  const moviePromises = trendingIds.map(async (id) => {
    try {
      const movie = await fetchContentById(id);
      return {
        title: movie.Title,
        year: movie.Year,
        imdbID: movie.imdbID,
        type: movie.Type,
        poster: movie.Poster,
      } as ContentItem;
    } catch (error) {
      console.error(`Failed to fetch movie ${id}:`, error);
      return null;
    }
  });

  const movies = await Promise.all(moviePromises);
  const validMovies = movies.filter(
    (movie): movie is ContentItem => movie !== null,
  );

  return (
    <div className="pl-4">
      <h1 className="font-light text-xl text-white md:text-[32px]">Trending</h1>

      <div className="flex gap-4 overflow-x-auto pt-4">
        {validMovies.map((movie) => (
          <MediaCard key={movie.imdbID} item={movie} type="trending" />
        ))}
      </div>
    </div>
  );
}
