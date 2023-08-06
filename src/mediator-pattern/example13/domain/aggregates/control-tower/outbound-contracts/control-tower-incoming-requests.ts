import { Position } from "../value-objects";
import { Airplane } from "../../airplane/outbound-contracts";
import { FuelStatus, MaintenanceStatus } from "../../airplane/value-objects";

export interface ControlTowerIncomingRequests {
  register(airplane: Airplane): void;

  handleTaxiRequest(airplane: Airplane): void;
  handleFuelRequest(airplane: Airplane): void;
  handleLandingRequest(airplane: Airplane): void;
  handleTakeoffRequest(airplane: Airplane): void;
  handleWeatherRequest(airplane: Airplane): void;
  handleAirTrafficRequest(airplane: Airplane): void;
  handleEmergencyLandRequest(airplane: Airplane): void;
  handleRunwayConditionRequest(airplane: Airplane): void;
  handleMaintenanceStatusReport(
    airplane: Airplane,
    maintenanceStatus: MaintenanceStatus
  ): void;
  handlePositionReport(airplane: Airplane, position: Position): void;
  handleFuelStatusReport(airplane: Airplane, fuelStatus: FuelStatus): void;
}
