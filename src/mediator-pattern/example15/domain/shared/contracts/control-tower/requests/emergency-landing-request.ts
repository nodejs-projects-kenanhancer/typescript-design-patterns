import { AirplaneRequestType } from "../../../enums";
import { EmergencyInfo } from "../../../value-objects";
import { AirplaneMediator } from "../../airplane";

export type EmergencyLandingRequest = {
  type: AirplaneRequestType.EmergencyLanding;
  runwayId: string;
  emergencyInfo: EmergencyInfo;
  from: AirplaneMediator;
};
