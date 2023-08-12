import { Direction } from "../../../enums";

export type RunwayExitSuccessIncomingResponse = {
  message: string;
  success: true;
  runwayId: string;
  direction: Direction;
};

export type RunwayExitFailureIncomingResponse = {
  message: string;
  success: false;
};

export type RunwayExitIncomingResponse =
  | RunwayExitSuccessIncomingResponse
  | RunwayExitFailureIncomingResponse;
