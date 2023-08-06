import { AirplaneRequestType, TakeoffType } from "../../../enums";

type TakeoffSuccessResponse = {
  type: AirplaneRequestType.Takeoff;
  message: string;
  success: true;
  runwayId: string;
  takeoffType: TakeoffType;
};

type TakeoffFailureResponse = {
  type: AirplaneRequestType.Takeoff;
  message: string;
  success: false;
};

export type TakeoffResponse = TakeoffSuccessResponse | TakeoffFailureResponse;
