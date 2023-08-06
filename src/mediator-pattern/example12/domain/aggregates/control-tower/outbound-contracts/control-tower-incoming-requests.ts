import { Airplane } from "../../airplane/outbound-contracts";

export interface ControlTowerIncomingRequests {
  register(airplane: Airplane): void;

  handleTaxiRequest(airplane: Airplane): void;

  handleRefuelRequest(airplane: Airplane): void;

  handleLandingRequest(airplane: Airplane): void;

  handleTakeoffRequest(airplane: Airplane): void;

  handleAirTrafficRequest(airplane: Airplane): void;

  handleEmergencyLandRequest(airplane: Airplane): void;

  handleRunwayConditionRequest(airplane: Airplane): void;

  handleWeatherConditionRequest(airplane: Airplane): void;
}
