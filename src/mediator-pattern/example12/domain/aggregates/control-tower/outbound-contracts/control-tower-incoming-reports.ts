import {
  EmergencyStatus,
  FuelStatus,
  MaintenanceStatus,
  Position,
  WeatherCondition,
} from "../../../shared/value-objects";
import { Airplane } from "../../airplane/outbound-contracts";

export interface ControlTowerIncomingReports {
  handlePositionReport(airplane: Airplane, position: Position): void;

  handleFuelStatusReport(airplane: Airplane, fuelStatus: FuelStatus): void;

  handlePassengerCountReport(airplane: Airplane, passengerCount: number): void;

  handleMaintenanceStatusReport(
    airplane: Airplane,
    maintenanceStatus: MaintenanceStatus
  ): void;

  handleWeatherConditionReport(
    airplane: Airplane,
    weatherCondition: WeatherCondition
  ): void;

  handleEmergencyStatusReport(
    airplane: Airplane,
    emergencyStatus: EmergencyStatus
  ): void;
}
