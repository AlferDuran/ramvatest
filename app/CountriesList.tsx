"use client";
import { Box, Grid, Text, Pagination, Select } from "grommet";
import { CountryCard } from "./CountryCard.component";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { BarLoader } from "react-spinners";

type CountriesListProps = {
  isLoading: boolean;
  setIsLoading: (boolean: boolean) => void;
};

export type CountriesListRef = {
  fetchData: (search: string) => Promise<void>;
};

export const CountriesList = forwardRef<CountriesListRef, CountriesListProps>(
  (props, ref) => {
    //Usually use this states with a hook like react query but had issues setting it up
    const [isError, setIsError] = useState(false);
    const [countries, setCountries] = useState<Country[] | undefined>();
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(1);

    const countriesInPage = useMemo(
      () =>
        [...(countries || [])]?.slice((page - 1) * pageSize, page * pageSize),
      [page, pageSize, countries]
    );

    useImperativeHandle(
      ref,
      () => {
        return {
          fetchData: async (search: string) => {
            props.setIsLoading(true);
            try {
              const response = await axios.get("/api/countries", {
                params: { search },
              });
              const result = response.data;
              setPage(1)
              setCountries(result);
            } catch (error) {
              setIsError(true);
            }

            props.setIsLoading(false);
          },
        };
      },
      [props]
    );

    return (
      <Box
        margin={{ top: "medium" }}
        style={{ flex: 1 }}
        pad={{ right: "small" }}
        data-testid="countriesList"
      >
        <Box style={{ visibility: props.isLoading ? "visible" : "hidden" }} data-testid="countriesListLoadingBar">
          <BarLoader color="#36d7b7" width="100%" />
        </Box>
        {!countries?.length ? (
          <Box flex justify="center" align="center">
            <Text size="xlarge" margin="none" data-testid="countriesListNoDataPlaceholder">
              {isError
                ? "Something went wrong, please try again later 😭"
                : countries
                ? "Oops! We couldn't find any results for that search 😔"
                : "What are you waiting for? Start searching now! 🔎"}
            </Text>{" "}
          </Box>
        ) : (
          <>
            <Box
              style={{ display: "flex" }}
              direction="row"
              align="center"
              justify="center"
              margin="small"
            >
              <Pagination
                data-testid="paginationCountriesList"
                size="large"
                page={page}
                numberItems={countries.length}
                step={pageSize}
                onChange={({ page }) => {
                  setPage(page);
                }}
              />
              <b>Page Size: </b>
              <Select
                data-testid="pageSizeCountriesList"
                margin={{ left: "xsmall" }}
                style={{ width: "50px" }}
                multiple={true}
                options={[5, 10, 15, 20, 30]}
                value={pageSize}
                onChange={({ option }) => setPageSize(option)}
              />
            </Box>

            <Box overflow="auto" margin={{ top: "small" }}>
              <Grid
                gap="medium"
                columns={{ count: "fit", size: "medium" }}
                margin={{ top: "small" }}
                pad={{ bottom: "medium", left: "small", right: "small" }}
                data-testid="cardListSizeCountriesList"
              >
                {countriesInPage?.map((country) => (
                  <CountryCard key={country.name} country={country} />
                ))}
              </Grid>
            </Box>
          </>
        )}
      </Box>
    );
  }
);

CountriesList.displayName = "CountriesList";
