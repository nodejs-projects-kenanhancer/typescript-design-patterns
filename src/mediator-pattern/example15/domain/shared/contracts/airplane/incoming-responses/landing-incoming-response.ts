import { Runway } from "../../../../aggregates/control-tower/entities";
import { AirplaneRequestType } from "../../../enums";

export type LandingSuccessIncomingResponse = {
  type: AirplaneRequestType.Landing;
  message: string;
  success: true;
  runway: Runway;
};

export type LandingFailureIncomingResponse = {
  type: AirplaneRequestType.Landing;
  message: string;
  success: false;
};

export type LandingIncomingResponse =
  | LandingSuccessIncomingResponse
  | LandingFailureIncomingResponse;
