import { Runway } from "../../../../aggregates/control-tower/entities";
import { TakeoffType } from "../../../enums";

export type TakeoffSuccessIncomingResponse = {
  message: string;
  success: true;
  runway: Runway;
  takeoffType: TakeoffType;
};

export type TakeoffFailureIncomingResponse = {
  message: string;
  success: false;
};

export type TakeoffIncomingResponse =
  | TakeoffSuccessIncomingResponse
  | TakeoffFailureIncomingResponse;
