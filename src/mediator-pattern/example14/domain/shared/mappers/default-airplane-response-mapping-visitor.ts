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

export class DefaultAirplaneResponseMappingVisitor
  implements AirplaneResponseMappingVisitor
{
  visitLandingResponse(response: LandingResponse): LandingIncomingResponse {
    const mappedResponse: LandingIncomingResponse = response.success
      ? {
          message: response.message,
          runway: response.runway,
          success: true,
        }
      : { message: response.message, success: false };

    return mappedResponse;
  }
  visitTakeoffResponse(response: TakeoffResponse): TakeoffIncomingResponse {
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
  visitEmergencyLandingResponse(
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
  visitRunwayExitResponse(
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
  visitTaxiToGateResponse(
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
  visitEngineShutdownResponse(
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
  visitEngineRefuelingResponse(
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
