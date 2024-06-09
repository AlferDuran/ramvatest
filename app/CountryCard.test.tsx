import React from "react";
import { render, screen } from "@testing-library/react";
import { CountryCard } from "./CountryCard.component";

const mockCountry: Country = {
  name: "Testland",
  alpha2Code: "TL",
  capital: "Testville",
  region: "Test Region",
  topLevelDomain: [],
  alpha3Code: "",
  callingCodes: [],
  altSpellings: [],
};

describe("CountryCard Component", () => {
  test("renders the CountryCard component with correct data", () => {
    render(<CountryCard country={mockCountry} />);

    // Check if the card is rendered
    const cardElement = screen.getByTestId("TLCard");
    expect(cardElement).toBeInTheDocument();

    // Check if the flag image is rendered with correct attributes
    const flagImage = screen.getByTestId("TLFlagimage");
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute("src", "https://flagcdn.com/w160/tl.png");
    expect(flagImage).toHaveAttribute("alt", "Testland Flag");

    // Check if the country name is rendered correctly
    const countryName = screen.getByTestId("TLName");
    expect(countryName).toBeInTheDocument();
    expect(countryName).toHaveTextContent("Testland");

    // Check if capital and region are rendered correctly
    const capitalFieldName = screen.getByTestId("TLcapitalFieldName");
    const capitalFieldValue = screen.getByTestId("TLcapitalFieldValue");
    expect(capitalFieldName).toBeInTheDocument();
    expect(capitalFieldName).toHaveTextContent("Capital:");
    expect(capitalFieldValue).toBeInTheDocument();
    expect(capitalFieldValue).toHaveTextContent("Testville");

    const regionFieldName = screen.getByTestId("TLregionFieldName");
    const regionFieldValue = screen.getByTestId("TLregionFieldValue");
    expect(regionFieldName).toBeInTheDocument();
    expect(regionFieldName).toHaveTextContent("Region:");
    expect(regionFieldValue).toBeInTheDocument();
    expect(regionFieldValue).toHaveTextContent("Test Region");
  });

  test("displays default value when field is missing", () => {
    const incompleteCountry: Country = {
      name: "Testland",
      alpha2Code: "TL",
      topLevelDomain: [],
      alpha3Code: "",
      callingCodes: [],
      capital: "",
      altSpellings: [],
      region: "",
    };

    render(<CountryCard country={incompleteCountry} />);

    const capitalFieldValue = screen.getByTestId("TLcapitalFieldValue");
    expect(capitalFieldValue).toBeInTheDocument();
    expect(capitalFieldValue).toHaveTextContent("--");

    const regionFieldValue = screen.getByTestId("TLregionFieldValue");
    expect(regionFieldValue).toBeInTheDocument();
    expect(regionFieldValue).toHaveTextContent("--");
  });
});
