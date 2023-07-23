import { Airplane } from "../airplane";
import { AirplaneRequest } from "../../mediator";

export interface AirplaneService {
  register(airplane: Airplane): void;
  receive(from: Airplane, message: string): void;
  sendRequest(
    request: AirplaneRequest,
    from: Airplane,
    details?: Record<string, any>
  ): void;
}
