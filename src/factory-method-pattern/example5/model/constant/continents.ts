export const CONTINENTS = {
  AF: "Africa",
  AN: "Antarctica",
  AS: "Asia",
  EU: "Europe",
  NA: "North America",
  OC: "Oceania",
  SA: "South America",
} as const;

export type ContinentType = keyof typeof CONTINENTS;
