import { AirplaneRequestType } from "../../../enums";
import { EngineShutdownIncomingResponse } from "../../airplane";
import { AirplaneResponseMappingVisitor } from "../../airplane-response-mapping-visitor";
import { IncomingResponseVisitor } from "./incoming-response-visitor";

export class EngineShutdownSuccessResponse implements IncomingResponseVisitor {
  readonly type = AirplaneRequestType.EngineShutdown;
  readonly success = true;
  message: string;
  engineId: string;

  constructor(message: string, engineId: string) {
    this.message = message;
    this.engineId = engineId;
  }

  accept(
    visitor: AirplaneResponseMappingVisitor
  ): EngineShutdownIncomingResponse {
    const mappedResponse = visitor.visit(this);

    return mappedResponse;
  }
}

export class EngineShutdownFailureResponse {
  readonly type = AirplaneRequestType.EngineShutdown;
  readonly success = false;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export type EngineShutdownResponse =
  | EngineShutdownSuccessResponse
  | EngineShutdownFailureResponse;
