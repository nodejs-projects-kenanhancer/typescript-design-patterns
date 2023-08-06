import { EmergencyLandingResponse } from "./emergency-landing-response";
import { EngineRefuelingResponse } from "./engine-refueling-response";
import { EngineShutdownResponse } from "./engine-shutdown-response";
import { LandingResponse } from "./landing-resonse";
import { RunwayExitResponse } from "./runway-exit-response";
import { TakeoffResponse } from "./takeoff-response";
import { TaxiToGateResponse } from "./taxi-to-gate-response";

export type AirplaneResponse =
  | LandingResponse
  | TakeoffResponse
  | RunwayExitResponse
  | TaxiToGateResponse
  | EmergencyLandingResponse
  | EngineShutdownResponse
  | EngineRefuelingResponse;
