import {
  EmergencyLandingIncomingResponse,
  EngineRefuelingIncomingResponse,
  EngineShutdownIncomingResponse,
  LandingIncomingResponse,
  RunwayExitIncomingResponse,
  TakeoffIncomingResponse,
  TaxiToGateIncomingResponse,
} from "./airplane";
import {
  EmergencyLandingResponse,
  EngineRefuelingResponse,
  EngineShutdownResponse,
  LandingResponse,
  RunwayExitResponse,
  TakeoffResponse,
  TaxiToGateResponse,
} from "./control-tower";

export interface AirplaneResponseMappingVisitor {
  visitLandingResponse(response: LandingResponse): LandingIncomingResponse;
  visitTakeoffResponse(response: TakeoffResponse): TakeoffIncomingResponse;
  visitEmergencyLandingResponse(
    response: EmergencyLandingResponse
  ): EmergencyLandingIncomingResponse;
  visitRunwayExitResponse(
    response: RunwayExitResponse
  ): RunwayExitIncomingResponse;
  visitTaxiToGateResponse(
    response: TaxiToGateResponse
  ): TaxiToGateIncomingResponse;
  visitEngineShutdownResponse(
    response: EngineShutdownResponse
  ): EngineShutdownIncomingResponse;
  visitEngineRefuelingResponse(
    response: EngineRefuelingResponse
  ): EngineRefuelingIncomingResponse;
}
