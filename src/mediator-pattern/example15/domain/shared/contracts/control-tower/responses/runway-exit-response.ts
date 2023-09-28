import { AirplaneRequestType, Direction } from "../../../enums";
import {
  RunwayExitFailureIncomingResponse,
  RunwayExitSuccessIncomingResponse,
} from "../../airplane";
import { AirplaneResponseVisitor } from "../../airplane-response-visitor";
import { VisitableResponse } from "./visitable-response";

export class RunwayExitSuccessResponse
  implements VisitableResponse<RunwayExitSuccessIncomingResponse>
{
  readonly type = AirplaneRequestType.RunwayExit;
  readonly success = true;
  message: string;
  runwayId: string;
  direction: Direction;

  constructor(message: string, runwayId: string, direction: Direction) {
    this.message = message;w
    this.runwayId = runwayId;
    this.direction = direction;
  }

  accept(visitor: AirplaneResponseVisitor): RunwayExitSuccessIncomingResponse {
    type TT = typeof this
    const mappedResponse = visitor.visit2(this);

    return mappedResponse;
  }
}

export class RunwayExitFailureResponse
  implements VisitableResponse<RunwayExitFailureIncomingResponse>
{
  readonly type = AirplaneRequestType.RunwayExit;
  readonly success = false;
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  accept(visitor: AirplaneResponseVisitor): RunwayExitFailureIncomingResponse {
    const mappedResponse = visitor.visit2(this);

    return mappedResponse;
  }
}

export type RunwayExitResponse =
  | RunwayExitSuccessResponse
  | RunwayExitFailureResponse;

function visit<
  TResponse extends RunwayExitResponse,
  TSuccess extends T1<TResponse>
>(response: TResponse): TSuccess {}

type InferSuccessType<T> = T extends { success: true }
  ? true
  : T extends { success: false }
  ? false
  : never;

function visit2<TResponse extends RunwayExitResponse, TSuccess extends InferSuccessType<TResponse> >(response: TResponse): InferSuccessType<TResponse> {
  if (response.success) {
    return true as InferSuccessType<TResponse>;
  }
  return false as InferSuccessType<TResponse>;
}

visit2(new RunwayExitSuccessResponse('','',Direction.EAST))