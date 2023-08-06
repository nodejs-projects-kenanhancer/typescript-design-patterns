import {
  AirTraffic,
  Emergency,
  FlightPlan,
  FuelStatus,
  MaintenanceStatus,
  RunwayCondition,
  WeatherUpdate,
} from "../../airplane/value-objects";
import { Airplane } from "../../airplane/outbound-contracts";

export interface ControlTowerOutgoingCommands {
  sendLandingPermission(airplane: Airplane): void;
  sendTakeoffPermission(airplane: Airplane): void;
  sendTaxiPermission(airplane: Airplane): void;
  sendRefuelConfirmation(airplane: Airplane): void;
  sendEmergencyLandPermission(airplane: Airplane): void;
  sendRunwayCondition(
    airplane: Airplane,
    runwayCondition: RunwayCondition
  ): void;
  sendMaintenanceUpdate(
    airplane: Airplane,
    maintenanceUpdate: MaintenanceStatus
  ): void;
  sendEmergency(airplane: Airplane, emergency: Emergency): void;
  sendFlightPlan(airplane: Airplane, flightPlan: FlightPlan): void;
  sendAirTrafficUpdate(airplane: Airplane, airTraffic: AirTraffic): void;
  sendWeatherUpdate(airplane: Airplane, weatherUpdate: WeatherUpdate): void;
  sendFuelStatusUpdate(airplane: Airplane, fuelStatusUpdate: FuelStatus): void;
}
