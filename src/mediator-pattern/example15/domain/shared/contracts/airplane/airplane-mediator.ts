import { AirplaneResponse } from "../control-tower/responses";
import { Airplane } from "./airplane";

export interface AirplaneMediator extends Airplane {
  sendResponseToAirplane(response: AirplaneResponse): void;
  // sendCommandToAirplane(command: Command): void;
}
