import { AirplaneInquiryType } from "../../../enums";
import { AirplaneMediator } from "../../airplane";

export type WeatherConditionInquiry = {
  type: AirplaneInquiryType.WeatherCondition;
  location: string;
  from: AirplaneMediator;
};
