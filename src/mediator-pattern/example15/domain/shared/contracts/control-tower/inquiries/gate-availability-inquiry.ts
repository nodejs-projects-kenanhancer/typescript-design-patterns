import { AirplaneInquiryType, InquiryType } from "../../../enums";
import { AirplaneMediator } from "../../airplane";

export type GateAvailabilityInquiry = {
  type: AirplaneInquiryType.GateAvailability;
  gateId: string;
  inquiryType: InquiryType;
  from: AirplaneMediator;
};
