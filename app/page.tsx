"use client";

import { Search } from "grommet-icons";
import { Box, Button, TextInput } from "grommet";

import { MutableRefObject, useRef, useState } from "react";

import { CountriesList, CountriesListRef } from "./CountriesList";

export default function Home() {
  //Usually use this states with a hook like react query but had issues setting it up
  const [isLoading, setIsLoading] = useState(false);

  const countriesListRef = useRef<CountriesListRef | null>(null);

  return (
    <Box flex>
      <SearchBar isLoading={isLoading} countriesListRef={countriesListRef} />
      <CountriesList
        ref={countriesListRef}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
    </Box>
  );
}

type SearchBarProps = {
  isLoading: boolean;
  countriesListRef: MutableRefObject<any>;
};
const SearchBar = (props: SearchBarProps) => {
  const [search, setSearch] = useState("");

  return (
    <Box
      style={{ display: "flex" }}
      direction="row"
      gap="small"
      data-testid="searchCountriesByNameBar"
    >
      <TextInput
        data-testid="searchCountriesByNameInput"
        icon={<Search />}
        placeholder="search by name ..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onKeyDown={(e) => {
          if (e.key === "Enter") props.countriesListRef.current?.fetchData(search);
        }}
      />
      <Button
        data-testid="searchCountriesByNamesButton"
        disabled={!search.trim() || props.isLoading}
        color="focus"
        primary
        label="let’s explore!"
        style={{ whiteSpace: "nowrap" }}
        onClick={() => {
          console.log(props.countriesListRef);
          props.countriesListRef.current?.fetchData();
        }}
      />
    </Box>
  );
};
