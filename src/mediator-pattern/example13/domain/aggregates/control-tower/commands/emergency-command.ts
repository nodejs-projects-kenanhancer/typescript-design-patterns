import { ControlTower } from "../outbound-contracts";
import { ControlTowerCommand } from "../inbound-contracts";
import { Airplane } from "../../airplane/outbound-contracts";

export class EmergencyCommand implements ControlTowerCommand {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(
      `JFK Control Tower is handling emergency report from ${from.name}`
    );

    controlTower.notifyAll(`${from.name} is reporting an emergency situation.`);
  }
}
