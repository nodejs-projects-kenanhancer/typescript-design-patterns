import { EmergencyLandingRequest } from "./emergency-landing-request";
import { EngineShutdownRequest } from "./engine-shutdown-request";
import { LandingRequest } from "./landing-request";
import { RefuelingRequest } from "./refueling-request";
import { RunwayExitRequest } from "./runway-exit-request";
import { TakeOffRequest } from "./takeoff-request";
import { TaxiToGateRequest } from "./taxi-to-gate-request";

export type AirplaneRequest =
  | LandingRequest
  | TakeOffRequest
  | RunwayExitRequest
  | TaxiToGateRequest
  | EngineShutdownRequest
  | EmergencyLandingRequest
  | RefuelingRequest;
