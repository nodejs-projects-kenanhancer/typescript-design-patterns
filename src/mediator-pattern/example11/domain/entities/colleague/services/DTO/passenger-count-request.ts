import { Airplane } from "../../airplane";
import { AirplaneRequest } from "../../../mediator";

export interface PassengerCountRequest {
  type: AirplaneRequest.PassengerCount;
  passengerCount: number;
  from: Airplane;
}
