import { AirplaneRequestType, Direction } from "../../../enums";
import { RunwayExitIncomingResponse } from "../../airplane";
import { AirplaneResponseMappingVisitor } from "../../airplane-response-mapping-visitor";
import { IncomingResponseVisitor } from "./incoming-response-visitor";

export class RunwayExitSuccessResponse implements IncomingResponseVisitor {
  readonly type = AirplaneRequestType.RunwayExit;
  readonly success = true;
  message: string;
  runwayId: string;
  direction: Direction;

  constructor(message: string, runwayId: string, direction: Direction) {
    this.message = message;
    this.runwayId = runwayId;
    this.direction = direction;
  }

  accept(visitor: AirplaneResponseMappingVisitor): RunwayExitIncomingResponse {
    const mappedResponse = visitor.visitRunwayExitResponse(this);

    return mappedResponse;
  }
}

export class RunwayExitFailureResponse {
  readonly type = AirplaneRequestType.RunwayExit;
  readonly success = false;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export type RunwayExitResponse =
  | RunwayExitSuccessResponse
  | RunwayExitFailureResponse;
