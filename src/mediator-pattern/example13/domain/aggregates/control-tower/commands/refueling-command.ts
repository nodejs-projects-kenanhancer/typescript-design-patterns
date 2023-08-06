import { ControlTower } from "../outbound-contracts";
import { ControlTowerCommand } from "../inbound-contracts";
import { Airplane } from "../../airplane/outbound-contracts";

export class RefuelingCommand implements ControlTowerCommand {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(
      `JFK Control Tower is handling refueling request from ${from.name}`
    );

    controlTower.notify("Refueling team is on its way.", from);
  }
}
