import { Airplane } from "../../airplane";
import { AirplaneRequest } from "../../../mediator";

export interface FlightPlanRequest {
  type: AirplaneRequest.FlightPlan;
  flightPlan: string;
  from: Airplane;
}
