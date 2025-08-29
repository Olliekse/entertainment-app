import { useBookmarksStore } from "@/features/bookmarks/useBookmarksStore";
import { useEffect } from "react";

export default function BookmarkButton({ id }: { id: string }) {
  const { bookmarks, setBookmarks, toggleBookmark } = useBookmarksStore();
  const isBookmarked = bookmarks.includes(id);

  useEffect(() => {
    const saved = localStorage.getItem("bookmarks");
    if (saved) setBookmarks(JSON.parse(saved));
  }, [setBookmarks]);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  return (
    <button
      onClick={() => toggleBookmark(id)}
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
