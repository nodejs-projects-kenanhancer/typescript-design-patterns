import { AirplaneRequestType, Direction } from "../../../enums";
import { AirplaneMediator } from "../../airplane";

export type RunwayExitRequest = {
  type: AirplaneRequestType.RunwayExit;
  runwayId: string;
  direction: Direction;
  from: AirplaneMediator;
};
