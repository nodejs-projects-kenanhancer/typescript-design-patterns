import { Runway } from "../../../../aggregates/control-tower/entities";
import { AirplaneRequestType } from "../../../enums";
import {
  LandingFailureIncomingResponse,
  LandingSuccessIncomingResponse,
} from "../../airplane";
import { AirplaneResponseVisitor } from "../../airplane-response-visitor";
import { VisitableResponse } from "./visitable-response";

export class LandingSuccessResponse
  implements VisitableResponse<LandingSuccessIncomingResponse>
{
  readonly type = AirplaneRequestType.Landing;
  readonly success = true;
  message: string;
  runway: Runway;

  constructor(message: string, runway: Runway) {
    this.message = message;
    this.runway = runway;
  }

  accept(visitor: AirplaneResponseVisitor): LandingSuccessIncomingResponse {
    const mappedResponse = visitor.visit(this);

    return mappedResponse;
  }
}

export class LandingFailureResponse
  implements VisitableResponse<LandingFailureIncomingResponse>
{
  readonly type = AirplaneRequestType.Landing;
  readonly success = false;
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  accept(visitor: AirplaneResponseVisitor): LandingFailureIncomingResponse {
    const mappedResponse = visitor.visit(this);

    return mappedResponse;
  }
}

export type LandingResponse = LandingSuccessResponse | LandingFailureResponse;
