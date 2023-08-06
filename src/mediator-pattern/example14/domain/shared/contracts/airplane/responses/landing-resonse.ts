import { AirplaneRequestType } from "../../../enums";

type LandingSuccessResponse = {
  type: AirplaneRequestType.Landing;
  message: string;
  success: true;
  runwayId: string;
};

type LandingFailureResponse = {
  type: AirplaneRequestType.Landing;
  message: string;
  success: false;
};

export type LandingResponse = LandingSuccessResponse | LandingFailureResponse;
