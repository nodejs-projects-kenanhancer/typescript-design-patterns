import { AirplaneRequestType } from "../enums";
import { AirplaneIncomingResponse } from "./airplane/incoming-responses";
import {
  EmergencyLandingResponse,
  EngineRefuelingResponse,
  EngineShutdownResponse,
  LandingResponse,
  RunwayExitResponse,
  RunwayExitSuccessResponse,
  TakeoffResponse,
  TaxiToGateResponse,
} from "./control-tower";

type T1<T extends {success: true} | {success: false}> = T extends {success: true} ? true : false;

type T2 = T1<RunwayExitSuccessResponse>

type InferSuccessType<T> = T extends { success: true }
  ? true
  : T extends { success: false }
  ? false
  : never;

type T3 = InferSuccessType<RunwayExitSuccessResponse>

export interface AirplaneResponseVisitor {
  visit<TResponse extends LandingResponse>(
    response: TResponse
  ): AirplaneIncomingResponse<
    AirplaneRequestType.Landing,
    TResponse["success"]
  >;

  visit<TResponse extends TakeoffResponse>(
    response: TResponse
  ): AirplaneIncomingResponse<
    AirplaneRequestType.Takeoff,
    TResponse["success"]
  >;

  visit<TResponse extends EmergencyLandingResponse>(
    response: TResponse
  ): AirplaneIncomingResponse<
    AirplaneRequestType.EmergencyLanding,
    TResponse["success"]
  >;

  visit<
    TResponse extends RunwayExitResponse,
    TSuccess extends InferSuccessType<TResponse>
  >(
    response: TResponse
  ): AirplaneIncomingResponse<
    AirplaneRequestType.RunwayExit,
    TSuccess
  >;

  visit2<TResponse extends RunwayExitResponse, TSuccess extends InferSuccessType<TResponse> >(response: TResponse): InferSuccessType<TResponse>

  visit<TResponse extends TaxiToGateResponse>(
    response: TResponse
  ): AirplaneIncomingResponse<
    AirplaneRequestType.TaxiToGate,
    TResponse["success"]
  >;

  visit<TResponse extends EngineShutdownResponse>(
    response: TResponse
  ): AirplaneIncomingResponse<
    AirplaneRequestType.EngineShutdown,
    TResponse["success"]
  >;

  visit<TResponse extends EngineRefuelingResponse>(
    response: TResponse
  ): AirplaneIncomingResponse<
    AirplaneRequestType.Refueling,
    TResponse["success"]
  >;
}
