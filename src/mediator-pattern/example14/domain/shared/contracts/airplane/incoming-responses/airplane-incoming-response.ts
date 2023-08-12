import { EmergencyLandingIncomingResponse } from "./emergency-landing-incoming-response";
import { EngineRefuelingIncomingResponse } from "./engine-refueling-incoming-response";
import { EngineShutdownIncomingResponse } from "./engine-shutdown-incoming-response";
import { LandingIncomingResponse } from "./landing-incoming-response";
import { RunwayExitIncomingResponse } from "./runway-exit-incoming-response";
import { TakeoffIncomingResponse } from "./takeoff-incoming-response";
import { TaxiToGateIncomingResponse } from "./taxi-to-gate-incoming-response";

export type AirplaneIncomingResponse =
  | LandingIncomingResponse
  | EmergencyLandingIncomingResponse
  | TakeoffIncomingResponse
  | EngineShutdownIncomingResponse
  | EngineRefuelingIncomingResponse
  | RunwayExitIncomingResponse
  | TaxiToGateIncomingResponse;
