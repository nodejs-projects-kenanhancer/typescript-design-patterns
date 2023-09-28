import { AirplaneRequestType } from "../../../enums";
import {
  EngineShutdownFailureIncomingResponse,
  EngineShutdownSuccessIncomingResponse,
} from "../../airplane";
import { AirplaneResponseVisitor } from "../../airplane-response-visitor";
import { VisitableResponse } from "./visitable-response";

export class EngineShutdownSuccessResponse
  implements VisitableResponse<EngineShutdownSuccessIncomingResponse>
{
  readonly type = AirplaneRequestType.EngineShutdown;
  readonly success = true;
  message: string;
  engineId: string;

  constructor(message: string, engineId: string) {
    this.message = message;
    this.engineId = engineId;
  }

  accept(
    visitor: AirplaneResponseVisitor
  ): EngineShutdownSuccessIncomingResponse {
    const mappedResponse = visitor.visit(this);

    return mappedResponse;
  }
}

export class EngineShutdownFailureResponse
  implements VisitableResponse<EngineShutdownFailureIncomingResponse>
{
  readonly type = AirplaneRequestType.EngineShutdown;
  readonly success = false;
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  accept(
    visitor: AirplaneResponseVisitor
  ): EngineShutdownFailureIncomingResponse {
    const mappedResponse = visitor.visit(this);

    return mappedResponse;
  }
}

export type EngineShutdownResponse =
  | EngineShutdownSuccessResponse
  | EngineShutdownFailureResponse;
