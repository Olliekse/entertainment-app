import { useBookmarksStore } from "@/features/bookmarks/useBookmarksStore";
import { useEffect, useCallback } from "react";
import Image from "next/image";

interface BookmarkButtonProps {
  id: string;
  variant?: "trending" | "recommended";
}

export default function BookmarkButton({
  id,
  variant = "recommended",
}: BookmarkButtonProps) {
  const { bookmarks, setBookmarks, toggleBookmark } = useBookmarksStore();
  const isBookmarked = bookmarks.includes(id);

  useEffect(() => {
    const saved = localStorage.getItem("bookmarks");
    if (saved) {
      try {
        const parsedBookmarks = JSON.parse(saved);
        if (Array.isArray(parsedBookmarks)) {
          setBookmarks(parsedBookmarks);
        }
      } catch (error) {
        console.error("Failed to parse bookmarks from localStorage:", error);
      }
    }
  }, [setBookmarks]);

  // Save bookmarks to localStorage when they change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleToggle = useCallback(() => {
    toggleBookmark(id);
  }, [toggleBookmark, id]);

  // Different positioning based on variant
  const getPositionClasses = () => {
    if (variant === "trending") {
      // For trending cards: position higher to avoid bottom overlay content
      return "absolute top-[8px] md:top-[16px] xl:top-[10px] right-[8px] md:right-[25px] xl:right-[25px]";
    } else {
      // For recommended cards: standard positioning
      return "absolute top-[7px] md:top-[13px] xl:top-[14px] right-[10px] md:right-[17px] xl:right-[18px]";
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`${getPositionClasses()} p-2 bg-black/50 rounded-full transition-all duration-200 cursor-pointer`}
    >
      <Image
        src={
          isBookmarked
            ? "/images/icon-bookmark-full.svg"
            : "/images/icon-bookmark-empty.svg"
        }
        alt={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
        width={13}
        height={16}
        className="w-[13px] h-4"
      />
    </button>
  );
}
