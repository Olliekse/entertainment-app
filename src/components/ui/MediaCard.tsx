import { ContentItem } from "@/lib/types";
import Image from "next/image";
import BookmarkButton from "@/components/bookmarks/BookmarkButton";

interface MediaCardProps {
  item: ContentItem;
  type?: string;
}

export default function MediaCard({ item, type }: MediaCardProps) {
  if (!item || !item.title || !item.imdbID) {
    return null;
  }

  return (
    <div
      className={`${type === "trending" ? "w-[240px]" : "w-[164px]"} rounded-lg hover:bg-[#1f2937] transition-colors duration-200 flex-shrink-0`}
    >
      <div className="relative">
        {item.poster && item.poster !== "N/A" ? (
          <img
            src={item.poster}
            alt={item.title}
            className={`w-full ${type === "trending" ? "h-[140px]" : "h-[110px]"} object-cover rounded-lg`}
          />
        ) : (
          <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}

        <BookmarkButton id={item.imdbID} />
      </div>

      <div>
        <div className="pt-2 flex items-center gap-2 font-light text-[11px] text-white opacity-75">
          <span>{item.year}</span>
          <span>•</span>
          <Image
            className="object-contain"
            width={12}
            height={12}
            alt="movie icon"
            src="/images/icon-category-movie.svg"
          />

          <span className="capitalize">{item.type}</span>
        </div>
        <h3 className="font-medium text-[14px] text-white mb-2 line-clamp-2">
          {item.title}
        </h3>
      </div>
    </div>
  );
}
