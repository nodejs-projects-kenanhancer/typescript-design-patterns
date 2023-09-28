export class AirplanePerformance {
  range: number;
  cruiseSpeed: number;
  maxSpeed: number;
  maxAltitude: number;

  constructor(
    range: number,
    cruiseSpeed: number,
    maxSpeed: number,
    maxAltitude: number
  ) {
    this.range = range;
    this.cruiseSpeed = cruiseSpeed;
    this.maxSpeed = maxSpeed;
    this.maxAltitude = maxAltitude;
  }
}
