import { create } from "zustand";

interface BookmarkState {
  bookmarks: string[];
  setBookmarks: (bookmark: string[]) => void;
  toggleBookmark: (id: string) => void;
}

export const useBookmarksStore = create<BookmarkState>((set) => ({
  bookmarks: [],

  setBookmarks: (bookmark) => set({ bookmarks: bookmark }),

  toggleBookmark: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks.includes(id)
        ? state.bookmarks.filter((bookmark) => bookmark !== id)
        : [...state.bookmarks, id],
    })),
}));
