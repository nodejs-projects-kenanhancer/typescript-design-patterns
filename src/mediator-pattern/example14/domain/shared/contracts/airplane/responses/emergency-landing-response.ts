import { AirplaneRequestType } from "../../../enums";

export type EmergencyLandingSuccessResponse = {
  type: AirplaneRequestType.EmergencyLanding;
  message: string;
  success: true;
  runwayId: string;
};

export type EmergencyLandingFailureResponse = {
  type: AirplaneRequestType.EmergencyLanding;
  message: string;
  success: false;
};

export type EmergencyLandingResponse =
  | EmergencyLandingSuccessResponse
  | EmergencyLandingFailureResponse;
