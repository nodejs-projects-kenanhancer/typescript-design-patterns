import { Precipitation } from "./precipitation";
import { WindDirection } from "./wind-direction";

export class WeatherUpdate {
  temperature: number; // in Celsius
  windSpeed: number; // in knots
  windDirection: WindDirection;
  visibility: number; // in meters
  precipitation: Precipitation;
}
