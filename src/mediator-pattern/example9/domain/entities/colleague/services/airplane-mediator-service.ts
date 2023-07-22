import { Airplane } from "../airplane";
import { AirplaneService } from "./airplane-service";
import { AirplaneRequest, ControlTower } from "../../mediator";

// Colleague Mediator Service Implementation
export class AirplaneMediatorService implements AirplaneService {
  private readonly controlTower: ControlTower;
  private airplane: Airplane;

  constructor(controlTower: ControlTower) {
    this.controlTower = controlTower;
  }

  register(airplane: Airplane): void {
    this.airplane = airplane;
    this.controlTower.register(airplane);
  }

  receive(message: string): void {
    console.log(`${this.airplane.name} receives message: ${message}`);
  }

  sendRequest(request: AirplaneRequest): void {
    console.log(`${this.airplane.name} is requesting ${AirplaneRequest[request]}.`);

    this.controlTower.receive(request, this.airplane);
  }
}
