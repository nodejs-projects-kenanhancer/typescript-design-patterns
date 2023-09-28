import { AirplaneInquiryType } from "../../../enums";
import { AirTrafficInfo } from "../../../value-objects";
import { AirplaneMediator } from "../../airplane";

export type AirTrafficInquiry = {
  type: AirplaneInquiryType.AirTraffic;
  info: AirTrafficInfo;
  from: AirplaneMediator;
};
