import { useBookmarksStore } from "@/features/bookmarks/useBookmarksStore";
import { useEffect, useCallback } from "react";

export default function BookmarkButton({ id }: { id: string }) {
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

  return (
    <button
      onClick={handleToggle}
      className="absolute top-2 right-2 p-2 bg-black/50 rounded-full transition-all duration-200 cursor-pointer"
    >
      <img
        src={
          isBookmarked
            ? "/images/icon-bookmark-full.svg"
            : "/images/icon-bookmark-empty.svg"
        }
        alt={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
        className="w-[13px] h-4"
      />
    </button>
  );
}
