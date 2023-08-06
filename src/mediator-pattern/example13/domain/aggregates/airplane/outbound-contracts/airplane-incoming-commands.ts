import {
  Emergency,
  FlightPlan,
  FuelStatus,
  AirTraffic,
  WeatherUpdate,
  RunwayCondition,
  MaintenanceStatus,
} from "../value-objects";

export interface AirplaneIncomingCommands {
  receiveTaxiPermission(): void;
  receiveLandingPermission(): void;
  receiveTakeoffPermission(): void;
  receiveRefuelConfirmation(): void;
  receiveEmergencyLandPermission(): void;
  receiveEmergency(emergency: Emergency): void;
  receiveFlightPlan(flightPlan: FlightPlan): void;
  receiveAirTrafficUpdate(airTraffic: AirTraffic): void;
  receiveWeatherUpdate(weatherUpdate: WeatherUpdate): void;
  receiveFuelStatusUpdate(fuelStatusUpdate: FuelStatus): void;
  receiveRunwayCondition(runwayCondition: RunwayCondition): void;
  receiveMaintenanceUpdate(maintenanceUpdate: MaintenanceStatus): void;
}
