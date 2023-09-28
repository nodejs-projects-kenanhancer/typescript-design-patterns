import { AirplaneRequestType, Direction } from "../../../enums";

export type RunwayExitSuccessIncomingResponse = {
  type: AirplaneRequestType.RunwayExit;
  message: string;
  success: true;
  runwayId: string;
  direction: Direction;
};

export type RunwayExitFailureIncomingResponse = {
  type: AirplaneRequestType.RunwayExit;
  message: string;
  success: false;
};

export type RunwayExitIncomingResponse =
  | RunwayExitSuccessIncomingResponse
  | RunwayExitFailureIncomingResponse;
