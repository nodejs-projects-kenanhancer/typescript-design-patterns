import { Runway } from "../../../../aggregates/control-tower/entities";
import { AirplaneRequestType } from "../../../enums";
import { EmergencyLandingIncomingResponse } from "../../airplane";
import { AirplaneResponseMappingVisitor } from "../../airplane-response-mapping-visitor";
import { IncomingResponseVisitor } from "./incoming-response-visitor";

export class EmergencyLandingSuccessResponse
  implements IncomingResponseVisitor
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
    visitor: AirplaneResponseMappingVisitor
  ): EmergencyLandingIncomingResponse {
    const mappedResponse = visitor.visit(this);

    return mappedResponse;
  }
}

export class EmergencyLandingFailureResponse {
  readonly type = AirplaneRequestType.EmergencyLanding;
  readonly success = false;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export type EmergencyLandingResponse =
  | EmergencyLandingSuccessResponse
  | EmergencyLandingFailureResponse;
