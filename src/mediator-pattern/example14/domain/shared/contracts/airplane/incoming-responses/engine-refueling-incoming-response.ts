import { FuelInfo } from "../../../value-objects";

export type EngineRefuelingSuccessIncomingResponse = {
  message: string;
  success: true;
  fuelInfo: FuelInfo;
};

export type EngineRefuelingFailureIncomingResponse = {
  message: string;
  success: false;
};

export type EngineRefuelingIncomingResponse =
  | EngineRefuelingSuccessIncomingResponse
  | EngineRefuelingFailureIncomingResponse;
