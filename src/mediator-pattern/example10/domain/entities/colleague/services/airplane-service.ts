import { Airplane } from "../airplane";
import { AirplaneRequest } from "../../mediator";

export interface AirplaneService {
  register(airplane: Airplane): void;
  receive(message: string): void;
  sendRequest(request: AirplaneRequest, details?: Record<string, any>): void;
}
