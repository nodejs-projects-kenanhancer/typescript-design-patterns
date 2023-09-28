export class WeatherStatus {
  temperature: number;
  windSpeed: number;
  windDirection: string;
  visibility: number;

  constructor(
    temperature: number,
    windSpeed: number,
    windDirection: string,
    visibility: number
  ) {
    this.temperature = temperature;
    this.windSpeed = windSpeed;
    this.windDirection = windDirection;
    this.visibility = visibility;
  }
}
