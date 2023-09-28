import { AirplaneRequestType } from "../../../enums";
import { FuelInfo } from "../../../value-objects";

export type EngineRefuelingSuccessIncomingResponse = {
  type: AirplaneRequestType.Refueling;
  message: string;
  success: true;
  fuelInfo: FuelInfo;
};

export type EngineRefuelingFailureIncomingResponse = {
  type: AirplaneRequestType.Refueling;
  message: string;
  success: false;
};

export type EngineRefuelingIncomingResponse =
  | EngineRefuelingSuccessIncomingResponse
  | EngineRefuelingFailureIncomingResponse;
