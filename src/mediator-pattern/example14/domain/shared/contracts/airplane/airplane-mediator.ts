import { Airplane } from "./airplane";
import { AirplaneResponse } from "../control-tower/responses";

export interface AirplaneMediator extends Airplane {
  sendResponseToAirplane(response: AirplaneResponse): void;
  // sendCommandToAirplane(command: Command): void;
}
