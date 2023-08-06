import { AirplaneRequestType } from "../../../enums";
import { FuelInfo } from "../../../value-objects";

type EngineRefuelingSuccessResponse = {
  type: AirplaneRequestType.Refueling;
  message: string;
  success: true;
  fuelInfo: FuelInfo;
};

type EngineRefuelingFailureResponse = {
  type: AirplaneRequestType.Refueling;
  message: string;
  success: false;
};

export type EngineRefuelingResponse =
  | EngineRefuelingSuccessResponse
  | EngineRefuelingFailureResponse;
