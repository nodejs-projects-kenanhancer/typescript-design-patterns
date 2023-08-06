import { ControlTower } from "../outbound-contracts";
import { ControlTowerCommand } from "../inbound-contracts";
import { Airplane } from "../../airplane/outbound-contracts";

export class TaxiCommand implements ControlTowerCommand {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(`JFK Control Tower is handling taxi request from ${from.name}`);

    controlTower.notify("Taxi permission granted.", from);
  }
}
