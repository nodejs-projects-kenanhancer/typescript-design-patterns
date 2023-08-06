import {
  AirTraffic,
  Emergency,
  FlightPlan,
  FuelStatus,
  MaintenanceStatus,
  RunwayCondition,
  WeatherCondition,
} from "../../../shared/value-objects";
import { Airplane } from "../../airplane/outbound-contracts";

export interface ControlTowerOutgoingCommands {
  sendLandingPermission(airplane: Airplane): void;

  sendTakeoffPermission(airplane: Airplane): void;

  sendTaxiPermission(airplane: Airplane): void;

  sendRefuelPermission(airplane: Airplane): void;

  sendEmergencyLandPermission(airplane: Airplane): void;

  sendEmergency(airplane: Airplane, emergency: Emergency): void;

  sendFlightPlan(airplane: Airplane, flightPlan: FlightPlan): void;

  sendAirTrafficUpdate(airplane: Airplane, airTraffic: AirTraffic): void;

  sendWeatherCondition(
    airplane: Airplane,
    weatherCondition: WeatherCondition
  ): void;

  sendFuelStatusUpdate(airplane: Airplane, fuelStatusUpdate: FuelStatus): void;

  sendRunwayCondition(
    airplane: Airplane,
    runwayCondition: RunwayCondition
  ): void;

  sendMaintenanceUpdate(
    airplane: Airplane,
    maintenanceUpdate: MaintenanceStatus
  ): void;
}
