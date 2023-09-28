import { AirplaneRequestType } from "../../../enums";
import { FuelInfo } from "../../../value-objects";
import {
  EngineRefuelingFailureIncomingResponse,
  EngineRefuelingSuccessIncomingResponse,
} from "../../airplane";
import { AirplaneResponseVisitor } from "../../airplane-response-visitor";
import { VisitableResponse } from "./visitable-response";

export class EngineRefuelingSuccessResponse
  implements VisitableResponse<EngineRefuelingSuccessIncomingResponse>
{
  readonly type = AirplaneRequestType.Refueling;
  readonly success = true;
  message: string;
  fuelInfo: FuelInfo;

  constructor(message: string, fuelInfo: FuelInfo) {
    this.message = message;
    this.fuelInfo = fuelInfo;
  }

  accept(
    visitor: AirplaneResponseVisitor
  ): EngineRefuelingSuccessIncomingResponse {
    const mappedResponse = visitor.visit(this);

    return mappedResponse;
  }
}

export class EngineRefuelingFailureResponse
  implements VisitableResponse<EngineRefuelingFailureIncomingResponse>
{
  readonly type = AirplaneRequestType.Refueling;
  readonly success = false;
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  accept(
    visitor: AirplaneResponseVisitor
  ): EngineRefuelingFailureIncomingResponse {
    const mappedResponse = visitor.visit(this);

    return mappedResponse;
  }
}

export type EngineRefuelingResponse =
  | EngineRefuelingSuccessResponse
  | EngineRefuelingFailureResponse;
