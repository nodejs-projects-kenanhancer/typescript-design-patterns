import {
  AirplaneResponseMappingVisitor,
  EmergencyLandingIncomingResponse,
  EmergencyLandingResponse,
  EngineRefuelingIncomingResponse,
  EngineRefuelingResponse,
  EngineShutdownIncomingResponse,
  EngineShutdownResponse,
  LandingIncomingResponse,
  LandingResponse,
  RunwayExitIncomingResponse,
  RunwayExitResponse,
  TakeoffIncomingResponse,
  TakeoffResponse,
  TaxiToGateIncomingResponse,
  TaxiToGateResponse,
} from "../contracts";
import { AirplaneRequestType } from "../enums";

export class DefaultAirplaneResponseMappingVisitor
  implements AirplaneResponseMappingVisitor
{
  visit(response: LandingResponse): LandingIncomingResponse;
  visit(response: TakeoffResponse): TakeoffIncomingResponse;
  visit(response: EmergencyLandingResponse): EmergencyLandingIncomingResponse;
  visit(response: RunwayExitResponse): RunwayExitIncomingResponse;
  visit(response: TaxiToGateResponse): TaxiToGateIncomingResponse;
  visit(response: EngineShutdownResponse): EngineShutdownIncomingResponse;
  visit(response: EngineRefuelingResponse): EngineRefuelingIncomingResponse;
  visit(
    response:
      | LandingResponse
      | TakeoffResponse
      | EmergencyLandingResponse
      | RunwayExitResponse
      | TaxiToGateResponse
      | EngineShutdownResponse
      | EngineRefuelingResponse
  ):
    | LandingIncomingResponse
    | TakeoffIncomingResponse
    | EmergencyLandingIncomingResponse
    | RunwayExitIncomingResponse
    | TaxiToGateIncomingResponse
    | EngineShutdownIncomingResponse
    | EngineRefuelingIncomingResponse {
    switch (response.type) {
      case AirplaneRequestType.Landing:
        return this.visitLandingResponse(response);
      case AirplaneRequestType.Takeoff:
        return this.visitTakeoffResponse(response);
      case AirplaneRequestType.EmergencyLanding:
        return this.visitEmergencyLandingResponse(response);
      case AirplaneRequestType.Refueling:
        return this.visitEngineRefuelingResponse(response);
      case AirplaneRequestType.EngineShutdown:
        return this.visitEngineShutdownResponse(response);
      case AirplaneRequestType.RunwayExit:
        return this.visitRunwayExitResponse(response);
      case AirplaneRequestType.TaxiToGate:
        return this.visitTaxiToGateResponse(response);
      default:
        const exhaustiveCheck: never = response;
        throw new Error(`Unrecognized Response Type ${exhaustiveCheck}`);
    }
  }

  private visitLandingResponse(
    response: LandingResponse
  ): LandingIncomingResponse {
    const mappedResponse: LandingIncomingResponse = response.success
      ? {
          message: response.message,
          runway: response.runway,
          success: true,
        }
      : { message: response.message, success: false };

    return mappedResponse;
  }

  private visitTakeoffResponse(
    response: TakeoffResponse
  ): TakeoffIncomingResponse {
    const mappedResponse: TakeoffIncomingResponse = response.success
      ? {
          message: response.message,
          runway: response.runway,
          takeoffType: response.takeoffType,
          success: true,
        }
      : { message: response.message, success: false };

    return mappedResponse;
  }

  private visitEmergencyLandingResponse(
    response: EmergencyLandingResponse
  ): EmergencyLandingIncomingResponse {
    const mappedResponse: EmergencyLandingIncomingResponse = response.success
      ? {
          message: response.message,
          runway: response.runway,
          success: true,
        }
      : { message: response.message, success: false };

    return mappedResponse;
  }

  private visitRunwayExitResponse(
    response: RunwayExitResponse
  ): RunwayExitIncomingResponse {
    const mappedResponse: RunwayExitIncomingResponse = response.success
      ? {
          message: response.message,
          runwayId: response.runwayId,
          direction: response.direction,
          success: true,
        }
      : { message: response.message, success: false };

    return mappedResponse;
  }

  private visitTaxiToGateResponse(
    response: TaxiToGateResponse
  ): TaxiToGateIncomingResponse {
    const mappedResponse: TaxiToGateIncomingResponse = response.success
      ? {
          message: response.message,
          gateId: response.gateId,
          success: true,
        }
      : { message: response.message, success: false };

    return mappedResponse;
  }

  private visitEngineShutdownResponse(
    response: EngineShutdownResponse
  ): EngineShutdownIncomingResponse {
    const mappedResponse: EngineShutdownIncomingResponse = response.success
      ? {
          message: response.message,
          engineId: response.engineId,
          success: true,
        }
      : { message: response.message, success: false };

    return mappedResponse;
  }

  private visitEngineRefuelingResponse(
    response: EngineRefuelingResponse
  ): EngineRefuelingIncomingResponse {
    const mappedResponse: EngineRefuelingIncomingResponse = response.success
      ? {
          message: response.message,
          fuelInfo: response.fuelInfo,
          success: true,
        }
      : { message: response.message, success: false };

    return mappedResponse;
  }
}
