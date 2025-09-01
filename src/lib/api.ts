const API_KEY = process.env.NEXT_PUBLIC_OMDB_KEY!;
const BASE_URL = process.env.NEXT_PUBLIC_OMDB_URL!;

export async function fetchMovies(type: string) {
  try {
    const res = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=movie&type=${type}`
    );
    if (!res.ok) throw new Error("Failed to fetch movies");
    const data = await res.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "No movies found");
    }

    return data.Search || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}

export async function fetchTVSeries(type: string) {
  try {
    const res = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=series&type=${type}`
    );
    if (!res.ok) throw new Error("Failed to fetch TV series");
    const data = await res.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "No TV series found");
    }

    const results = data.Search || [];
    return results.filter((item: { Type: string }) => item.Type === "series");
  } catch (error) {
    console.error("Error fetching TV series:", error);
    throw error;
  }
}

export async function searchContent(query: string, type: string) {
  try {
    const res = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=${type}`
    );
    if (!res.ok) throw new Error("Failed to search content");
    const data = await res.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "No results found");
    }

    return data.Search || [];
  } catch (error) {
    console.error("Error searching content:", error);
    throw error;
  }
}

export async function fetchContentById(imdbId: string) {
  try {
    const res = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(imdbId)}`
    );
    if (!res.ok) throw new Error("Failed to fetch content by ID");
    const data = await res.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "Content not found");
    }

    return data;
  } catch (error) {
    console.error("Error fetching content by ID:", error);
    throw error;
  }
}
