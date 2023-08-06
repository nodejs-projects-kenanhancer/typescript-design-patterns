import { ControlTower } from "../outbound-contracts";
import { ControlTowerCommand } from "../inbound-contracts";
import { Airplane } from "../../airplane/outbound-contracts";

export class TakeoffCommand implements ControlTowerCommand {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(
      `JFK Control Tower is handling takeoff request from ${from.name}`
    );

    controlTower.notify("Permission to take off granted.", from);
  }
}
