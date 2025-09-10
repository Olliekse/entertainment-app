import { render, screen } from "@testing-library/react";
import MediaCard from "./MediaCard";

const mockItem = {
  title: "Rocky",
  year: "2024",
  imdbID: "123456789",
  type: "movie",
  poster:
    "https://www.hollywoodreporter.com/wp-content/uploads/2015/11/rocky_pub01_-_h_2015.jpg",
};

test("MediaCard shows the movie title", () => {
  render(<MediaCard item={mockItem} />);

  expect(screen.getByText(`${mockItem.title}`)).toBeInTheDocument();
});

test("MediaCard shows the movie's year", () => {
  render(<MediaCard item={mockItem} />);

  expect(screen.getByText(`${mockItem.year}`)).toBeInTheDocument();
});

test("MediaCard shows the movie's type", () => {
  render(<MediaCard item={mockItem} />);

  expect(screen.getByText(`${mockItem.type}`)).toBeInTheDocument();
});
