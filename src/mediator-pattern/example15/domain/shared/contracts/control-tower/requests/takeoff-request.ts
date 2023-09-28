import { AirplaneRequestType, TakeoffType } from "../../../enums";
import { AirplaneMediator } from "../../airplane";

export type TakeOffRequest = {
  type: AirplaneRequestType.Takeoff;
  runwayId: string;
  takeoffType: TakeoffType;
  from: AirplaneMediator;
};
