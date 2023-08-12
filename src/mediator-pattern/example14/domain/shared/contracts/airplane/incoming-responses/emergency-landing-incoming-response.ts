import { Runway } from "../../../../aggregates/control-tower/entities";

export type EmergencyLandingSuccessIncomingResponse = {
  message: string;
  success: true;
  runway: Runway;
};

export type EmergencyLandingFailureIncomingResponse = {
  message: string;
  success: false;
};

export type EmergencyLandingIncomingResponse =
  | EmergencyLandingSuccessIncomingResponse
  | EmergencyLandingFailureIncomingResponse;
