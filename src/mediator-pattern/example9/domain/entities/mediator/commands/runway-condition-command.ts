import { Airplane } from "../../colleague";
import { ControlTower } from "../control-tower";
import { ControlTowerCommand } from "./control-tower-command";

export class RunwayConditionCommand implements ControlTowerCommand {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(
      `JFK Control Tower is handling runway conditions request from ${from.name}`
    );

    controlTower.notify("Runway conditions are normal.", from);
  }
}
