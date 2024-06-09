import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import Home from "./page";

// Mock the CountriesList component
const mockFetchData = jest.fn();
jest.mock("./CountriesList", () => ({
  // eslint-disable-next-line react/display-name
  CountriesList: React.forwardRef((props, ref) => {
    React.useImperativeHandle(ref, () => ({
      fetchData: mockFetchData,
    }));
    return <div data-testid="countriesList" />;
  }),
}));

describe("Home Component", () => {
  test("renders the Home component", () => {
    render(<Home />);

    expect(screen.getByTestId("searchCountriesByNameBar")).toBeInTheDocument();
    expect(screen.getByTestId("countriesList")).toBeInTheDocument();
  });

  test("updates search input value", () => {
    render(<Home />);

    const searchInput = screen.getByTestId("searchCountriesByNameInput");
    fireEvent.change(searchInput, { target: { value: "Test Country" } });
    expect(searchInput).toHaveValue("Test Country");
  });

  test("calls fetchData on search button click", async () => {
    render(<Home />);

    const searchInput = screen.getByTestId("searchCountriesByNameInput");
    const searchButton = screen.getByTestId("searchCountriesByNamesButton");

    fireEvent.change(searchInput, { target: { value: "Test Country" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalled();
    });
  });

  test("calls fetchData on Enter key press", async () => {
    render(<Home />);
    const searchInput = screen.getByTestId("searchCountriesByNameInput");

    fireEvent.change(searchInput, { target: { value: "Test Country" } });
    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalled();
    });
  });

  test("disables search button when input is empty or loading", () => {
    render(<Home />);

    const searchButton = screen.getByTestId("searchCountriesByNamesButton");
    expect(searchButton).toBeDisabled();

    const searchInput = screen.getByTestId("searchCountriesByNameInput");
    fireEvent.change(searchInput, { target: { value: "Test Country" } });
    expect(searchButton).not.toBeDisabled();

    render(<Home />);
    fireEvent.change(searchInput, { target: { value: "" } });
    expect(searchButton).toBeDisabled();
  });
});
