import { useBookmarksStore } from "./useBookmarksStore";

test("Bookmarks store starts as an empty array", () => {
  expect(useBookmarksStore.getState().bookmarks).toEqual([]);
});

test("Added bookmark appears in the list", () => {
  useBookmarksStore.getState().setBookmarks(["123456789"]);

  expect(useBookmarksStore.getState().bookmarks).toEqual(["123456789"]);
});

test("Removed bookmark is no longer in the list", () => {
  const { toggleBookmark } = useBookmarksStore.getState();

  useBookmarksStore.getState().setBookmarks(["123456789"]);

  toggleBookmark("123456789");

  expect(useBookmarksStore.getState().bookmarks).toEqual([]);
});


