import { Box, Card, CardBody, CardHeader, Image, Text } from "grommet";
import { formatFieldToName } from "./utils";

type CountryCardProps = {
  country: Country;
};

const displayInfo = ["capital", "region"];

export const CountryCard = ({ country }: CountryCardProps) => {
  return (
    <Card width="large" height="medium">
      <CardBody height="small">
        <Image
          loading="lazy"
          fit="contain"
          src={`https://flagcdn.com/w160/${country.alpha2Code.toLocaleLowerCase()}.png`}
          a11yTitle={`${country.name} Flag`}
          alt={`${country.name} Flag`}
        />
      </CardBody>
      <CardHeader pad="small" style={{ fontWeight: "bold" }}>
        <Text margin="none" color="brand">
          {" "}
          {country.name}
        </Text>
      </CardHeader>
      <Box pad="small" margin={{ bottom: "medium" }}>
        {displayInfo.map((fieldName) => (
          <Info key={fieldName} fieldName={fieldName} country={country} />
        ))}
      </Box>
    </Card>
  );
};
type InfoProps = {
  fieldName: string;
  country: Country;
};
const Info = (props: InfoProps) => (
  <Box flex direction="row" gap="xsmall" margin={{ top: "small" }}>
    <Text weight="bolder">{formatFieldToName(props.fieldName)}:</Text>
    <Text>{(props.country as any)[props.fieldName] || "--"}</Text>
  </Box>
);
