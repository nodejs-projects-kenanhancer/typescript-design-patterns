import { Precipitation, WindDirection } from "../enums";

export class WeatherCondition {
  temperature: number; // in Celsius
  windSpeed: number; // in knots
  visibility: number; // in meters
  windDirection: WindDirection;
  precipitation: Precipitation;
}
