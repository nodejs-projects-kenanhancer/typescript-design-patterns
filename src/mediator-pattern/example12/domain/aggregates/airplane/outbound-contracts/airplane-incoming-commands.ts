import {
  AirTraffic,
  Emergency,
  FlightPlan,
  FuelStatus,
  MaintenanceStatus,
  Runway,
  RunwayCondition,
  WeatherCondition,
} from "../../../shared/value-objects";

export interface AirplaneIncomingCommands {
  receiveTakeoffPermission(): void;

  receiveTaxiPermission(): void;

  receiveRefuelPermission(): void;

  receiveLandingPermission(runway: Runway): void;

  receiveEmergencyLandPermission(runway: Runway): void;

  receiveEmergency(emergency: Emergency): void;

  receiveFlightPlan(flightPlan: FlightPlan): void;

  receiveAirTrafficUpdate(airTraffic: AirTraffic): void;

  receiveWeatherCondition(weatherCondition: WeatherCondition): void;

  receiveFuelStatusUpdate(fuelStatusUpdate: FuelStatus): void;

  receiveRunwayCondition(runwayCondition: RunwayCondition): void;

  receiveMaintenanceUpdate(maintenanceUpdate: MaintenanceStatus): void;
}
