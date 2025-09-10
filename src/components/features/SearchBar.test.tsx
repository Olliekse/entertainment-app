import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "./SearchBar";

test("SearchBar shows the placeholder text", () => {
  const mockSetSearchTerm = () => {};

  render(
    <SearchBar
      searchTerm=""
      setSearchTerm={mockSetSearchTerm}
      placeholderText="Search for movies"
    />
  );

  expect(screen.getByPlaceholderText("Search for movies")).toBeInTheDocument();
});

test("SearchBar shows the search icon", () => {
  const mockSetSearchTerm = () => {};

  render(
    <SearchBar
      searchTerm=""
      setSearchTerm={mockSetSearchTerm}
      placeholderText="Search for movies"
    />
  );

  expect(screen.getByAltText("search icon")).toBeInTheDocument();
});

test("SearchBar calls setSearchTerm after debounce delay", async () => {
  const mockSetSearchTerm = jest.fn();

  render(
    <SearchBar
      searchTerm=""
      setSearchTerm={mockSetSearchTerm}
      placeholderText="Search for movies"
    />
  );

  const input = screen.getByPlaceholderText("Search for movies");

  fireEvent.change(input, { target: { value: "batman" } });

  // Initially, setSearchTerm should not be called
  expect(mockSetSearchTerm).not.toHaveBeenCalled();

  // Wait for the debounce delay
  await waitFor(
    () => {
      expect(mockSetSearchTerm).toHaveBeenCalledWith("batman");
    },
    { timeout: 500 }
  );
});
