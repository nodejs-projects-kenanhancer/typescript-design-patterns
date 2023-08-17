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
  visit(response: LandingResponse): LandingIncomingResponse;
  visit(response: TakeoffResponse): TakeoffIncomingResponse;
  visit(response: EmergencyLandingResponse): EmergencyLandingIncomingResponse;
  visit(response: RunwayExitResponse): RunwayExitIncomingResponse;
  visit(response: TaxiToGateResponse): TaxiToGateIncomingResponse;
  visit(response: EngineShutdownResponse): EngineShutdownIncomingResponse;
  visit(response: EngineRefuelingResponse): EngineRefuelingIncomingResponse;
}
