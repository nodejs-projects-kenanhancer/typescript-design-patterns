import { Airplane } from "../airplane";
import { AirplaneServiceRequest } from "./DTO";
import { AirplaneService } from "./airplane-service";
import { AirplaneRequest, ControlTower } from "../../mediator";

// Colleague Mediator Service Implementation
export class AirplaneMediatorService implements AirplaneService {
  private readonly controlTower: ControlTower;

  constructor(controlTower: ControlTower) {
    this.controlTower = controlTower;
  }

  register(airplane: Airplane): void {
    this.controlTower.register(airplane);
  }

  receive(from: Airplane, message: string): void {
    console.log(`${from.name} receives message: ${message}`);
  }

  sendRequest(request: AirplaneServiceRequest): void {
    const { type: requestType, from, ...details } = request;

    console.log(
      `${from.name} is requesting permission to ${
        AirplaneRequest[request.type]
      }. ${JSON.stringify(details || {})}`
    );

    this.controlTower.receive(requestType, from, details);
  }
}
