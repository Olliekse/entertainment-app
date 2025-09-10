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
      className={`${type === "trending" ? "w-[240px] md:w-[470px] relative" : "w-[164px] md:w-[220px] xl:w-[280px]"} rounded-lg hover:bg-[#1f2937] transition-colors duration-200 flex-shrink-0`}
    >
      <div className="relative">
        {item.poster && item.poster !== "N/A" ? (
          <Image
            src={item.poster}
            alt={item.title}
            width={type === "trending" ? 470 : 280}
            height={type === "trending" ? 230 : 174}
            className={`w-full ${type === "trending" ? "h-[140px] md:h-[230px]" : "h-[110px] md:h-[140px] xl:h-[174px]"} object-cover rounded-lg`}
          />
        ) : (
          <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}

        <BookmarkButton
          id={item.imdbID}
          variant={type === "trending" ? "trending" : "recommended"}
        />

        {type === "trending" && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg pointer-events-none" />
        )}
      </div>

      {type === "trending" ? (
        <div className="absolute bottom-3 md:bottom-5 left-4 md:left-6 right-4 z-10">
          <div className="flex items-center gap-[9px] md:gap-[7px] font-light text-[11px] md:text-[15px] text-white opacity-75 pb-2 md:pb-0 xl:pb-[7px]">
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
          <h3 className="font-medium text-[14px] md:text-[24px] text-white line-clamp-2">
            {item.title}
          </h3>
        </div>
      ) : (
        <div>
          <div className="pt-2 pb-1 flex items-center gap-[8px] md:gap-[11px] xl:gap-[10px] md:tracking-wide xl:tracking-wider font-light text-[11px] text-white opacity-75">
            <span>{item.year}</span>
            <span>•</span>
            <Image
              className="object-contain"
              width={10}
              height={10}
              alt="movie icon"
              src="/images/icon-category-movie.svg"
            />
            <span className="capitalize">{item.type}</span>
          </div>
          <h3 className="font-medium text-[14px] xl:text-[18px] text-white mb-2 line-clamp-2">
            {item.title}
          </h3>
        </div>
      )}
    </div>
  );
}
