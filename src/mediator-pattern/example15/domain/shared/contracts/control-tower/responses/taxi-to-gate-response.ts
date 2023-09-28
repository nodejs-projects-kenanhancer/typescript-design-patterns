import { AirplaneRequestType } from "../../../enums";
import {
  TaxiToGateFailureIncomingResponse,
  TaxiToGateSuccessIncomingResponse,
} from "../../airplane";
import { AirplaneResponseVisitor } from "../../airplane-response-visitor";
import { VisitableResponse } from "./visitable-response";

export class TaxiToGateSuccessResponse
  implements VisitableResponse<TaxiToGateSuccessIncomingResponse>
{
  readonly type = AirplaneRequestType.TaxiToGate;
  readonly success = true;
  message: string;
  gateId: string;

  constructor(message: string, gateId: string) {
    this.message = message;
    this.gateId = gateId;
  }

  accept(visitor: AirplaneResponseVisitor): TaxiToGateSuccessIncomingResponse {
    const mappedResponse = visitor.visit(this);

    return mappedResponse;
  }
}

export class TaxiToGateFailureResponse
  implements VisitableResponse<TaxiToGateFailureIncomingResponse>
{
  readonly type = AirplaneRequestType.TaxiToGate;
  readonly success = false;
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  accept(visitor: AirplaneResponseVisitor): TaxiToGateFailureIncomingResponse {
    const mappedResponse = visitor.visit(this);

    return mappedResponse;
  }
}

export type TaxiToGateResponse =
  | TaxiToGateSuccessResponse
  | TaxiToGateFailureResponse;
