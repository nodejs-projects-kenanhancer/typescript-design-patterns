import { Airplane } from "../../airplane";
import { AirplaneRequest } from "../../../mediator";
import { FlightPlanRequest } from "./flight-plan-request";
import { WeatherUpdateRequest } from "./weather-update-request";
import { PassengerCountRequest } from "./passenger-count-request";

export type AirplaneServiceRequest =
  | WeatherUpdateRequest
  | FlightPlanRequest
  | PassengerCountRequest
  | { type: AirplaneRequest; from: Airplane };
