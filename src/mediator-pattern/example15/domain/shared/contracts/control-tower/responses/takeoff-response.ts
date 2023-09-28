import { Runway } from "../../../../aggregates/control-tower/entities";
import { AirplaneRequestType, TakeoffType } from "../../../enums";
import {
  TakeoffFailureIncomingResponse,
  TakeoffSuccessIncomingResponse,
} from "../../airplane";
import { AirplaneResponseVisitor } from "../../airplane-response-visitor";
import { VisitableResponse } from "./visitable-response";

export class TakeoffSuccessResponse
  implements VisitableResponse<TakeoffSuccessIncomingResponse>
{
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

  accept(visitor: AirplaneResponseVisitor): TakeoffSuccessIncomingResponse {
    const mappedResponse = visitor.visit(this);

    return mappedResponse;
  }
}

export class TakeoffFailureResponse
  implements VisitableResponse<TakeoffFailureIncomingResponse>
{
  readonly type = AirplaneRequestType.Takeoff;
  readonly success = false;
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  accept(visitor: AirplaneResponseVisitor): TakeoffFailureIncomingResponse {
    const mappedResponse = visitor.visit(this);

    return mappedResponse;
  }
}

export type TakeoffResponse = TakeoffSuccessResponse | TakeoffFailureResponse;
