import { Airplane } from "../../colleague";
import { ControlTower } from "../control-tower";
import { ControlTowerCommand } from "./control-tower-command";

export class ReceiveFlightPlanCommand implements ControlTowerCommand {
  execute(
    from: Airplane,
    controlTower: ControlTower,
    details?: Record<string, any>
  ): void {
    console.log(
      `JFK Control Tower is handling weather update request from ${
        from.name
      }: ${JSON.stringify(details || {})}`
    );

    controlTower.notify("Flight Plan Received.", from);
  }
}
