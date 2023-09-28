import { Runway } from "../../../../aggregates/control-tower/entities";
import { AirplaneRequestType } from "../../../enums";

export type EmergencyLandingSuccessIncomingResponse = {
  type: AirplaneRequestType.EmergencyLanding;
  message: string;
  success: true;
  runway: Runway;
};

export type EmergencyLandingFailureIncomingResponse = {
  type: AirplaneRequestType.EmergencyLanding;
  message: string;
  success: false;
};

export type EmergencyLandingIncomingResponse =
  | EmergencyLandingSuccessIncomingResponse
  | EmergencyLandingFailureIncomingResponse;
