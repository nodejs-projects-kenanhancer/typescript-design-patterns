export class AirplaneTechnical {
  engineType: string;
  fuelCapacity: number;
  numberOfEngines: number;
  maxTakeoffWeight: number;
  engineThrust: number;

  constructor(
    engineType: string,
    fuelCapacity: number,
    numberOfEngines: number,
    maxTakeoffWeight: number,
    engineThrust: number
  ) {
    this.engineType = engineType;
    this.fuelCapacity = fuelCapacity;
    this.numberOfEngines = numberOfEngines;
    this.maxTakeoffWeight = maxTakeoffWeight;
    this.engineThrust = engineThrust;
  }
}
