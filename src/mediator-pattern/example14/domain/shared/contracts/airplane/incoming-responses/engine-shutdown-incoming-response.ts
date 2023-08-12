export type EngineShutdownSuccessIncomingResponse = {
  message: string;
  success: true;
  engineId: string;
};

export type EngineShutdownFailureIncomingResponse = {
  message: string;
  success: false;
};

export type EngineShutdownIncomingResponse =
  | EngineShutdownSuccessIncomingResponse
  | EngineShutdownFailureIncomingResponse;
