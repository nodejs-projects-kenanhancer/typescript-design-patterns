import { Airplane } from "../airplane";
import { AirplaneServiceRequest } from "./DTO";

export interface AirplaneService {
  register(airplane: Airplane): void;
  receive(from: Airplane, message: string): void;
  sendRequest(request: AirplaneServiceRequest): void;
}
