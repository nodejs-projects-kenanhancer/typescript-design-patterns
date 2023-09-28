import { Runway } from "../../../../aggregates/control-tower/entities";
import { AirplaneRequestType } from "../../../enums";
import {
  EmergencyLandingFailureIncomingResponse,
  EmergencyLandingSuccessIncomingResponse,
} from "../../airplane";
import { AirplaneResponseVisitor } from "../../airplane-response-visitor";
import { VisitableResponse } from "./visitable-response";

export class EmergencyLandingSuccessResponse
  implements VisitableResponse<EmergencyLandingSuccessIncomingResponse>
{
  readonly type = AirplaneRequestType.EmergencyLanding;
  readonly success = true;
  message: string;
  runway: Runway;

  constructor(message: string, runway: Runway) {
    this.message = message;
    this.runway = runway;
  }

  accept(
    visitor: AirplaneResponseVisitor
  ): EmergencyLandingSuccessIncomingResponse {
    const mappedResponse = visitor.visit(this);

    return mappedResponse;
  }
}

export class EmergencyLandingFailureResponse
  implements VisitableResponse<EmergencyLandingFailureIncomingResponse>
{
  readonly type = AirplaneRequestType.EmergencyLanding;
  readonly success = false;
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  accept(
    visitor: AirplaneResponseVisitor
  ): EmergencyLandingFailureIncomingResponse {
    const mappedResponse = visitor.visit(this);

    return mappedResponse;
  }
}

export type EmergencyLandingResponse =
  | EmergencyLandingSuccessResponse
  | EmergencyLandingFailureResponse;
