import { Airplane } from "../colleague";
import { AirplaneRequest } from "./airplane-request";

export interface ControlTower {
  register(airplane: Airplane): void;
  receive(request: AirplaneRequest, from: Airplane): void;
  notifyAll(message: string): void;
  notify(message: string, to: Airplane): void;
}
