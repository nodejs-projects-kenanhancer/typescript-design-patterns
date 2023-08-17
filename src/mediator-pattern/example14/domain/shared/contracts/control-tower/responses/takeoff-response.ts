import { Runway } from "../../../../aggregates/control-tower/entities";
import { AirplaneRequestType, TakeoffType } from "../../../enums";
import { TakeoffIncomingResponse } from "../../airplane";
import { AirplaneResponseMappingVisitor } from "../../airplane-response-mapping-visitor";
import { IncomingResponseVisitor } from "./incoming-response-visitor";

export class TakeoffSuccessResponse implements IncomingResponseVisitor {
  readonly type = AirplaneRequestType.Takeoff;
  readonly success = true;
  message: string;
  runway: Runway;
  takeoffType: TakeoffType;

  constructor(message: string, runway: Runway, takeoffType: TakeoffType) {
    this.message = message;
    this.runway = runway;
    this.takeoffType = takeoffType;
  }

  accept(visitor: AirplaneResponseMappingVisitor): TakeoffIncomingResponse {
    const mappedResponse = visitor.visit(this);

    return mappedResponse;
  }
}

export class TakeoffFailureResponse {
  readonly type = AirplaneRequestType.Takeoff;
  readonly success = false;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export type TakeoffResponse = TakeoffSuccessResponse | TakeoffFailureResponse;
