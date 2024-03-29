import { Runway } from "../../../../aggregates/control-tower/entities";
import { AirplaneRequestType } from "../../../enums";
import { LandingIncomingResponse } from "../../airplane";
import { AirplaneResponseMappingVisitor } from "../../airplane-response-mapping-visitor";
import { VisitableResponse } from "./visitable-response";

export class LandingSuccessResponse implements VisitableResponse {
  readonly type = AirplaneRequestType.Landing;
  readonly success = true;
  message: string;
  runway: Runway;

  constructor(message: string, runway: Runway) {
    this.message = message;
    this.runway = runway;
  }

  accept(visitor: AirplaneResponseMappingVisitor): LandingIncomingResponse {
    const mappedResponse = visitor.visit(this);

    return mappedResponse;
  }
}

export class LandingFailureResponse {
  readonly type = AirplaneRequestType.Landing;
  readonly success = false;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export type LandingResponse = LandingSuccessResponse | LandingFailureResponse;
