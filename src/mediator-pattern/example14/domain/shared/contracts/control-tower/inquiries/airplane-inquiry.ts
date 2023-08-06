import { AirTrafficInquiry } from "./air-traffic-inquiry";
import { RunwayStatusInquiry } from "./runway-status-inquiry";
import { GateAvailabilityInquiry } from "./gate-availability-inquiry";
import { WeatherConditionInquiry } from "./weather-condition-inquiry";

export type AirplaneInquiry =
  | RunwayStatusInquiry
  | GateAvailabilityInquiry
  | WeatherConditionInquiry
  | AirTrafficInquiry;
