import { AirplaneRequestType } from "../../../enums";
import { TaxiToGateIncomingResponse } from "../../airplane";
import { AirplaneResponseMappingVisitor } from "../../airplane-response-mapping-visitor";
import { IncomingResponseVisitor } from "./incoming-response-visitor";

export class TaxiToGateSuccessResponse implements IncomingResponseVisitor {
  readonly type = AirplaneRequestType.TaxiToGate;
  readonly success = true;
  message: string;
  gateId: string;

  constructor(message: string, gateId: string) {
    this.message = message;
    this.gateId = gateId;
  }

  accept(visitor: AirplaneResponseMappingVisitor): TaxiToGateIncomingResponse {
    const mappedResponse = visitor.visit(this);

    return mappedResponse;
  }
}

export class TaxiToGateFailureResponse {
  readonly type = AirplaneRequestType.TaxiToGate;
  readonly success = false;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export type TaxiToGateResponse =
  | TaxiToGateSuccessResponse
  | TaxiToGateFailureResponse;
