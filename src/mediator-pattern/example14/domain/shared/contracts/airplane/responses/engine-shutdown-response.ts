import { AirplaneRequestType } from "../../../enums";

type EngineShutdownSuccessResponse = {
  type: AirplaneRequestType.EngineShutdown;
  message: string;
  success: true;
  engineId: string;
};

type EngineShutdownFailureResponse = {
  type: AirplaneRequestType.EngineShutdown;
  message: string;
  success: false;
};

export type EngineShutdownResponse =
  | EngineShutdownSuccessResponse
  | EngineShutdownFailureResponse;
