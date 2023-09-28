import { AirplaneRequestType } from "../../../enums";

export type EngineShutdownSuccessIncomingResponse = {
  type: AirplaneRequestType.EngineShutdown;
  message: string;
  success: true;
  engineId: string;
};

export type EngineShutdownFailureIncomingResponse = {
  type: AirplaneRequestType.EngineShutdown;
  message: string;
  success: false;
};

export type EngineShutdownIncomingResponse =
  | EngineShutdownSuccessIncomingResponse
  | EngineShutdownFailureIncomingResponse;
