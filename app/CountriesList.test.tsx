import React, { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";

import axios from "axios";
import { CountriesList, CountriesListRef } from "./CountriesList";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockCountries = [
  {
    name: "Country 1",
    alpha2Code: "C1",
    capital: "Capital 1",
    region: "Region 1",
  },
  {
    name: "Country 2",
    alpha2Code: "C2",
    capital: "Capital 2",
    region: "Region 2",
  },
];

describe("CountriesList Component", () => {
  let ref: React.RefObject<CountriesListRef>;

  beforeEach(() => {
    ref = React.createRef<CountriesListRef>();
  });

  test("renders without data initially", () => {
    render(
      <CountriesList isLoading={false} setIsLoading={jest.fn()} ref={ref} />
    );
    expect(screen.getByTestId("countriesList")).toBeInTheDocument();
    expect(
      screen.getByTestId("countriesListNoDataPlaceholder")
    ).toHaveTextContent("What are you waiting for? Start searching now! 🔎");
  });

  test("displays countries correctly after data fetch", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockCountries });
    render(
      <CountriesList isLoading={false} setIsLoading={jest.fn()} ref={ref} />
    );

    // Simulate data fetch
    if (ref.current) {
      await act(async () => await ref.current?.fetchData(""));
    }

    await waitFor(() =>
      expect(
        screen.queryByTestId("countriesListNoDataPlaceholder")
      ).not.toBeInTheDocument()
    );
    expect(screen.getAllByTestId(/Card$/)).toHaveLength(mockCountries.length);
  });

  test("handles loading state", async () => {
    render(
      <CountriesList isLoading={true} setIsLoading={jest.fn()} ref={ref} />
    );
    expect(screen.getByTestId("countriesList")).toBeInTheDocument();
    expect(screen.getByTestId("countriesListLoadingBar")).toBeVisible();
  });

  test("displays error message on fetch error", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Failed to fetch"));
    render(
      <CountriesList isLoading={false} setIsLoading={jest.fn()} ref={ref} />
    );

    // Simulate data fetch
    if (ref.current) {
      await act(async () => await ref.current?.fetchData(""));
    }

    await waitFor(() =>
      expect(
        screen.getByTestId("countriesListNoDataPlaceholder")
      ).toHaveTextContent("Something went wrong, please try again later 😭")
    );
  });
});
