import { Airplane } from "../../colleague";
import { ControlTower } from "../control-tower";
import { ControlTowerCommand } from "./control-tower-command";

export class MaintenanceCommand implements ControlTowerCommand {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(
      `JFK Control Tower is handling maintenance status from ${from.name}`
    );

    controlTower.notify("Maintenance status received.", from);
  }
}
