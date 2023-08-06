import { FuelStatus, MaintenanceStatus } from "../value-objects";
import { Position } from "../../control-tower/value-objects";

export interface AirplaneOutgoingRequests {
  requestTaxi(): void;
  requestRefuel(): void;
  requestLanding(): void;
  requestTakeoff(): void;
  requestWeather(): void;
  requestAirTraffic(): void;
  requestEmergencyLand(): void;
  requestRunwayCondition(): void;
  reportPosition(position: Position): void;
  reportFuelStatus(fuelStatus: FuelStatus): void;
  reportMaintenanceStatus(maintenanceStatus: MaintenanceStatus): void;
}
