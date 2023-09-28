import {
  AirplaneIncomingResponse,
  AirplaneResponse,
  AirplaneResponseVisitor,
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
  TaxiToGateResponse
} from "../contracts";
import { AirplaneRequestType } from "../enums";

export class AirplaneResponseMappingVisitor implements AirplaneResponseVisitor {
  visit<TResponse extends LandingResponse>(response: TResponse): AirplaneIncomingResponse<AirplaneRequestType.Landing, TResponse["success"]>;
  visit<TResponse extends TakeoffResponse>(response: TResponse): AirplaneIncomingResponse<AirplaneRequestType.Takeoff, TResponse["success"]>;
  visit<TResponse extends EmergencyLandingResponse>(response: TResponse): AirplaneIncomingResponse<AirplaneRequestType.EmergencyLanding, TResponse["success"]>;
  visit<TResponse extends RunwayExitResponse>(response: TResponse): AirplaneIncomingResponse<AirplaneRequestType.RunwayExit, TResponse["success"]>;
  visit<TResponse extends TaxiToGateResponse>(response: TResponse): AirplaneIncomingResponse<AirplaneRequestType.TaxiToGate, TResponse["success"]>;
  visit<TResponse extends EngineShutdownResponse>(response: TResponse): AirplaneIncomingResponse<AirplaneRequestType.EngineShutdown, TResponse["success"]>;
  visit<TResponse extends EngineRefuelingResponse>(response: TResponse): AirplaneIncomingResponse<AirplaneRequestType.Refueling, TResponse["success"]>;
  visit< TResponse extends AirplaneResponse>(response: TResponse): AirplaneIncomingResponse<AirplaneRequestType.Landing, TResponse["success"]> | AirplaneIncomingResponse<AirplaneRequestType.Takeoff, TResponse["success"]> | AirplaneIncomingResponse<AirplaneRequestType.EmergencyLanding, TResponse["success"]> | AirplaneIncomingResponse<AirplaneRequestType.RunwayExit, TResponse["success"]> | AirplaneIncomingResponse<AirplaneRequestType.TaxiToGate, TResponse["success"]> | AirplaneIncomingResponse<AirplaneRequestType.EngineShutdown, TResponse["success"]> | AirplaneIncomingResponse<AirplaneRequestType.Refueling, TResponse["success"]> {
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
          type: AirplaneRequestType.Landing,
          message: response.message,
          runway: response.runway,
          success: true,
        }
      : {
          type: AirplaneRequestType.Landing,
          message: response.message,
          success: false,
        };

    return mappedResponse;
  }

  private visitTakeoffResponse(
    response: TakeoffResponse
  ): TakeoffIncomingResponse {
    const mappedResponse: TakeoffIncomingResponse = response.success
      ? {
          type: AirplaneRequestType.Takeoff,
          message: response.message,
          runway: response.runway,
          takeoffType: response.takeoffType,
          success: true,
        }
      : {
          type: AirplaneRequestType.Takeoff,
          message: response.message,
          success: false,
        };

    return mappedResponse;
  }

  private visitEmergencyLandingResponse(
    response: EmergencyLandingResponse
  ): EmergencyLandingIncomingResponse {
    const mappedResponse: EmergencyLandingIncomingResponse = response.success
      ? {
          type: AirplaneRequestType.EmergencyLanding,
          message: response.message,
          runway: response.runway,
          success: true,
        }
      : {
          type: AirplaneRequestType.EmergencyLanding,
          message: response.message,
          success: false,
        };

    return mappedResponse;
  }

  private visitRunwayExitResponse(
    response: RunwayExitResponse
  ): RunwayExitIncomingResponse {
    const mappedResponse: RunwayExitIncomingResponse = response.success
      ? {
          type: AirplaneRequestType.RunwayExit,
          message: response.message,
          runwayId: response.runwayId,
          direction: response.direction,
          success: true,
        }
      : {
          type: AirplaneRequestType.RunwayExit,
          message: response.message,
          success: false,
        };

    return mappedResponse;
  }

  private visitTaxiToGateResponse(
    response: TaxiToGateResponse
  ): TaxiToGateIncomingResponse {
    const mappedResponse: TaxiToGateIncomingResponse = response.success
      ? {
          type: AirplaneRequestType.TaxiToGate,
          message: response.message,
          gateId: response.gateId,
          success: true,
        }
      : {
          type: AirplaneRequestType.TaxiToGate,
          message: response.message,
          success: false,
        };

    return mappedResponse;
  }

  private visitEngineShutdownResponse(
    response: EngineShutdownResponse
  ): EngineShutdownIncomingResponse {
    const mappedResponse: EngineShutdownIncomingResponse = response.success
      ? {
          type: AirplaneRequestType.EngineShutdown,
          message: response.message,
          engineId: response.engineId,
          success: true,
        }
      : {
          type: AirplaneRequestType.EngineShutdown,
          message: response.message,
          success: false,
        };

    return mappedResponse;
  }

  private visitEngineRefuelingResponse(
    response: EngineRefuelingResponse
  ): EngineRefuelingIncomingResponse {
    const mappedResponse: EngineRefuelingIncomingResponse = response.success
      ? {
          type: AirplaneRequestType.Refueling,
          message: response.message,
          fuelInfo: response.fuelInfo,
          success: true,
        }
      : {
          type: AirplaneRequestType.Refueling,
          message: response.message,
          success: false,
        };

    return mappedResponse;
  }
}

const a1 = new AirplaneResponseMappingVisitor();

a1.visit()