import { ControlTower } from "../outbound-contracts";
import { ControlTowerCommand } from "../inbound-contracts";
import { Airplane } from "../../airplane/outbound-contracts";

export class PositionCommand implements ControlTowerCommand {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(
      `JFK Control Tower is handling position report from ${from.name}`
    );

    controlTower.notify("Position received.", from);
  }
}
