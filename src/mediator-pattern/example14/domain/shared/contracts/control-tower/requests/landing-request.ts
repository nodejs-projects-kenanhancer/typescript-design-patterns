import { AirplaneRequestType, LandingType } from "../../../enums";
import { AirplaneMediator } from "../../airplane";

export type LandingRequest = {
  type: AirplaneRequestType.Landing;
  runwayId: string;
  landingType: LandingType;
  from: AirplaneMediator;
};
