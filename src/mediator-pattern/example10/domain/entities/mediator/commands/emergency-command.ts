import { Airplane } from "../../colleague";
import { ControlTower } from "../control-tower";
import { ControlTowerCommand } from "./control-tower-command";

export class EmergencyCommand implements ControlTowerCommand {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(
      `JFK Control Tower is handling emergency report from ${from.name}`
    );

    controlTower.notifyAll(`${from.name} is reporting an emergency situation.`);
  }
}
