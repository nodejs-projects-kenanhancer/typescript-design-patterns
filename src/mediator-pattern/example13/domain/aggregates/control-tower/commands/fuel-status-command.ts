import { ControlTower } from "../outbound-contracts";
import { ControlTowerCommand } from "../inbound-contracts";
import { Airplane } from "../../airplane/outbound-contracts";

export class FuelStatusCommand implements ControlTowerCommand {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(
      `JFK Control Tower is handling fuel status report from ${from.name}`
    );

    controlTower.notify("Fuel status acknowledged.", from);
  }
}
