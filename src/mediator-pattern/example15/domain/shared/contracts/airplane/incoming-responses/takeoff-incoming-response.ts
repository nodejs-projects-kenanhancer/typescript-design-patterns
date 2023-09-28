import { Runway } from "../../../../aggregates/control-tower/entities";
import { AirplaneRequestType, TakeoffType } from "../../../enums";

export type TakeoffSuccessIncomingResponse = {
  type: AirplaneRequestType.Takeoff;
  message: string;
  success: true;
  runway: Runway;
  takeoffType: TakeoffType;
};

export type TakeoffFailureIncomingResponse = {
  type: AirplaneRequestType.Takeoff;
  message: string;
  success: false;
};

export type TakeoffIncomingResponse =
  | TakeoffSuccessIncomingResponse
  | TakeoffFailureIncomingResponse;
