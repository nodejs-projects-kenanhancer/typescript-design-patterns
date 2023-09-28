import { AirplaneRequestType } from "../../../enums";
import { EmergencyLandingResponse } from "./emergency-landing-response";
import { EngineRefuelingResponse } from "./engine-refueling-response";
import { EngineShutdownResponse } from "./engine-shutdown-response";
import { LandingResponse } from "./landing-response";
import { RunwayExitResponse } from "./runway-exit-response";
import { TakeoffResponse } from "./takeoff-response";
import { TaxiToGateResponse } from "./taxi-to-gate-response";

type AirplaneResponseUnion =
  | LandingResponse
  | TakeoffResponse
  | RunwayExitResponse
  | TaxiToGateResponse
  | EmergencyLandingResponse
  | EngineShutdownResponse
  | EngineRefuelingResponse;

export type AirplaneResponse<
  TRequestType extends AirplaneRequestType = AirplaneRequestType,
  TSuccess extends boolean = any,
  TAirplaneResponse extends AirplaneResponseUnion = AirplaneResponseUnion
> = TAirplaneResponse extends { type: TRequestType; success: TSuccess }
  ? TAirplaneResponse
  : never;
