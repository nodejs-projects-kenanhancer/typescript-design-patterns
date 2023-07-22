import { Airplane } from "../../colleague";
import { ControlTower } from "../control-tower";
import { ControlTowerCommand } from "./control-tower-command";

export class TaxiCommand implements ControlTowerCommand {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(`JFK Control Tower is handling taxi request from ${from.name}`);

    controlTower.notify("Taxi permission granted.", from);
  }
}
