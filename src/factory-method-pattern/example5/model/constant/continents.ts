export interface Continent {
  name: string;
  code: string;
  regions: readonly string[];
}

export const CONTINENTS = [
  {
    name: "Africa",
    code: "AF",
    regions: [
      "Middle Africa",
      "Northern Africa",
      "Southern Africa",
      "Eastern Africa",
      "Western Africa",
    ],
  },
  {
    name: "Antarctica",
    code: "AN",
    regions: ["Antarctica"],
  },
  {
    name: "Asia",
    code: "AS",
    regions: [
      "Central Asia",
      "Southern Asia",
      "South-eastern Asia",
      "Eastern Asia",
      "Western Asia",
    ],
  },
  {
    name: "Europe",
    code: "EU",
    regions: [
      "Northern Europe",
      "Southern Europe",
      "Eastern Europe",
      "Western Europe",
    ],
  },
  {
    name: "North America",
    code: "NA",
    regions: ["Central America", "Northern America", "Caribbean"],
  },
  {
    name: "South America",
    code: "SA",
    regions: ["South America"],
  },
  {
    name: "Oceania",
    code: "OC",
    regions: ["Oceania"],
  },
] as const satisfies readonly Continent[];

export type ContinentCodes = (typeof CONTINENTS)[number]["code"];

export type ContinentNames = (typeof CONTINENTS)[number]["name"];

export type ContinentRegions<
  TContinentCode extends ContinentCodes,
  TContinents extends typeof CONTINENTS = typeof CONTINENTS
> = TContinents extends readonly (infer A)[]
  ? A extends Continent
    ? A["code"] extends TContinentCode
      ? A["regions"][number]
      : never
    : never
  : never;

export type ContinentType = (typeof CONTINENTS)[number] extends infer A
  ? A extends Continent
    ? {
        code: A["code"];
        region: A["regions"][number];
      }
    : never
  : never;
