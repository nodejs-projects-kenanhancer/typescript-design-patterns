import { AirplaneRequestType } from "../../../enums";
import { AirTrafficInquiry } from "./air-traffic-inquiry";
import { GateAvailabilityInquiry } from "./gate-availability-inquiry";
import { RunwayStatusInquiry } from "./runway-status-inquiry";
import { WeatherConditionInquiry } from "./weather-condition-inquiry";

export type AirplaneInquiryUnion =
  | RunwayStatusInquiry
  | GateAvailabilityInquiry
  | WeatherConditionInquiry
  | AirTrafficInquiry;

export type AirplaneInquiry<
  TRequestType extends AirplaneRequestType = AirplaneRequestType,
  TIncomingResponse extends AirplaneInquiryUnion = AirplaneInquiryUnion
> = TIncomingResponse extends { type: TRequestType }
  ? TIncomingResponse
  : never;
