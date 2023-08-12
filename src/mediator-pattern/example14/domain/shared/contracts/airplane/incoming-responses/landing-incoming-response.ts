import { Runway } from "../../../../aggregates/control-tower/entities";

export type LandingSuccessIncomingResponse = {
  message: string;
  success: true;
  runway: Runway;
};

export type LandingFailureIncomingResponse = {
  message: string;
  success: false;
};

export type LandingIncomingResponse =
  | LandingSuccessIncomingResponse
  | LandingFailureIncomingResponse;
