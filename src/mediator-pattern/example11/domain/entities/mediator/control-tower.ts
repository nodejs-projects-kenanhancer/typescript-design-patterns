import { Airplane } from "../colleague";
import { AirplaneRequest } from "./airplane-request";

// Mediator interface
export interface ControlTower {
  register(airplane: Airplane): void;
  receive(
    request: AirplaneRequest,
    from: Airplane,
    details?: Record<string, any>
  ): void;
  notifyAll(message: string): void;
  notify(message: string, to: Airplane): void;
}
