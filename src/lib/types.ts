export interface Movie {
  title: string;
  thumbnail: {
    trending?: {
      small: string;
      large: string;
    };
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}

export interface OMDBMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface OMDBResponse {
  Search: OMDBMovie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface ContentItem {
  title: string;
  year: string;
  imdbID: string;
  type: string;
  poster: string;
}
