import { Position } from "./position";
import { FuelStatus } from "./fuel-status";
import { WeatherStatus } from "./weather-status";
import { FlightOperation } from "./flight-operation";
import { AirTrafficStatus } from "./air-traffic-status";
import { MaintenanceStatus } from "./maintenance-status";
import { EngineStatus, LandingGearStatus } from "../enums";

export class AirplaneStatus {
  passengerCount: number;
  fuelStatus: FuelStatus;
  currentLocation: Position;
  engineStatus: EngineStatus;
  flightOperation: FlightOperation;
  maintenanceStatus: MaintenanceStatus;
  airTraffic: AirTrafficStatus;
  weatherCondition: WeatherStatus;
  landingGearStatus: LandingGearStatus;

  constructor(
    passengerCount: number,
    fuelStatus: FuelStatus,
    currentLocation: Position,
    engineStatus: EngineStatus,
    flightOperation: FlightOperation,
    maintenanceStatus: MaintenanceStatus,
    airTraffic: AirTrafficStatus,
    weatherCondition: WeatherStatus,
    landingGearStatus: LandingGearStatus
  ) {
    passengerCount = passengerCount;
    fuelStatus = fuelStatus;
    currentLocation = currentLocation;
    engineStatus = engineStatus;
    flightOperation = flightOperation;
    maintenanceStatus = maintenanceStatus;
    airTraffic = airTraffic;
    weatherCondition = weatherCondition;
    landingGearStatus = landingGearStatus;
  }
}
