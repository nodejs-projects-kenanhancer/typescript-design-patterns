import { ControlTower } from "../outbound-contracts";
import { ControlTowerCommand } from "../inbound-contracts";
import { Airplane } from "../../airplane/outbound-contracts";

export class RunwayConditionCommand implements ControlTowerCommand {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(
      `JFK Control Tower is handling runway conditions request from ${from.name}`
    );

    controlTower.notify("Runway conditions are normal.", from);
  }
}
