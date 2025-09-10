import { render, screen, fireEvent } from "@testing-library/react";

import MediaCard from "./BookmarkButton";
import BookmarkButton from "./BookmarkButton";

const mockItem = {
  title: "Rocky",
  year: "2024",
  imdbID: "123456789",
  type: "movie",
  poster:
    "https://www.hollywoodreporter.com/wp-content/uploads/2015/11/rocky_pub01_-_h_2015.jpg",
};

test("BookmarkButton appears on MediaCard", () => {
  render(<MediaCard item={mockItem} />);

  const bookmark = screen.getByRole("button", {
    name: /bookmark/i,
  });

  expect(bookmark).toBeInTheDocument();
});

test("Clicking BookmarkButton causes it to change appearance", () => {
  render(<BookmarkButton item={mockItem} />);

  expect(screen.getByAltText("Add to bookmarks")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByAltText("Remove from bookmarks")).toBeInTheDocument();
});
