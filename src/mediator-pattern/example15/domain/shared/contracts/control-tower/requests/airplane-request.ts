import { AirplaneRequestType } from "../../../enums";
import { EmergencyLandingRequest } from "./emergency-landing-request";
import { EngineShutdownRequest } from "./engine-shutdown-request";
import { LandingRequest } from "./landing-request";
import { RefuelingRequest } from "./refueling-request";
import { RunwayExitRequest } from "./runway-exit-request";
import { TakeOffRequest } from "./takeoff-request";
import { TaxiToGateRequest } from "./taxi-to-gate-request";

type AirplaneRequestUnion =
  | LandingRequest
  | TakeOffRequest
  | RunwayExitRequest
  | TaxiToGateRequest
  | EngineShutdownRequest
  | EmergencyLandingRequest
  | RefuelingRequest;

export type AirplaneRequest<
  TRequestType extends AirplaneRequestType = AirplaneRequestType,
  TAirplaneRequest extends AirplaneRequestUnion = AirplaneRequestUnion
> = TAirplaneRequest extends { type: TRequestType } ? TAirplaneRequest : never;
