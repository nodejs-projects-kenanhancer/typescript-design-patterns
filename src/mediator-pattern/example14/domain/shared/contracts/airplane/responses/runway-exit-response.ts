import { AirplaneRequestType, Direction } from "../../../enums";

type RunwayExitSuccessResponse = {
  type: AirplaneRequestType.RunwayExit;
  message: string;
  success: true;
  runwayId: string;
  direction: Direction;
};

type RunwayExitFailureResponse = {
  type: AirplaneRequestType.RunwayExit;
  message: string;
  success: false;
};

export type RunwayExitResponse =
  | RunwayExitSuccessResponse
  | RunwayExitFailureResponse;
