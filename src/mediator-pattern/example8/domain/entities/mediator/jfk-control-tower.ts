import { Airplane } from "../colleague";
import { ControlTower } from "./control-tower";
import { ControlTowerCommand } from "./commands";
import { AirplaneRequest } from "./airplane-request";

// Concrete Mediator
export class JFKControlTower implements ControlTower {
  private readonly airplanes: Airplane[] = [];
  private readonly commands: Map<AirplaneRequest, ControlTowerCommand>;

  constructor(commands: Map<AirplaneRequest, ControlTowerCommand>) {
    this.commands = commands;
  }

  register(airplane: Airplane): void {
    this.airplanes.push(airplane);

    console.log(`JFK Control Tower registered ${airplane.name} Airplane.`);
  }

  receive(request: AirplaneRequest, from: Airplane): void {
    console.log(
      `JFK Control Tower received request ${AirplaneRequest[request]} from ${from.name}`
    );

    const command = this.commands.get(request);

    if (command) {
      command.execute(from, this);
    } else {
      console.log(
        `No command registered for request ${AirplaneRequest[request]}`
      );
    }
  }

  notifyAll(message: string): void {
    for (const airplane of this.airplanes) {
      this.notify(message, airplane);
    }
  }

  notify(message: string, to: Airplane): void {
    console.log(`JFK Control Tower is notifying ${to.name}: ${message}`);

    to.receive(message);
  }
}
