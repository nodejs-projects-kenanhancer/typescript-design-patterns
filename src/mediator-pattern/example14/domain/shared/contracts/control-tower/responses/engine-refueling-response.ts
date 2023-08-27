import { AirplaneRequestType } from "../../../enums";
import { FuelInfo } from "../../../value-objects";
import { EngineRefuelingIncomingResponse } from "../../airplane";
import { AirplaneResponseMappingVisitor } from "../../airplane-response-mapping-visitor";
import { VisitableResponse } from "./visitable-response";

export class EngineRefuelingSuccessResponse implements VisitableResponse {
  readonly type = AirplaneRequestType.Refueling;
  readonly success = true;
  message: string;
  fuelInfo: FuelInfo;

  constructor(message: string, fuelInfo: FuelInfo) {
    this.message = message;
    this.fuelInfo = fuelInfo;
  }

  accept(
    visitor: AirplaneResponseMappingVisitor
  ): EngineRefuelingIncomingResponse {
    const mappedResponse = visitor.visit(this);

    return mappedResponse;
  }
}

export class EngineRefuelingFailureResponse {
  readonly type = AirplaneRequestType.Refueling;
  readonly success = false;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export type EngineRefuelingResponse =
  | EngineRefuelingSuccessResponse
  | EngineRefuelingFailureResponse;
