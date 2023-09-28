import { AirplaneInquiryType, InquiryType } from "../../../enums";
import { AirplaneMediator } from "../../airplane";

export type RunwayStatusInquiry = {
  type: AirplaneInquiryType.RunwayStatus;
  runwayId: string;
  inquiryType: InquiryType;
  from: AirplaneMediator;
};
