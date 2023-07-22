import { Airplane } from "../../colleague";
import { ControlTower } from "../control-tower";
import { ControlTowerCommand } from "./control-tower-command";

export class FuelStatusCommand implements ControlTowerCommand {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(
      `JFK Control Tower is handling fuel status report from ${from.name}`
    );

    controlTower.notify("Fuel status acknowledged.", from);
  }
}
