import { ControlTower } from "../outbound-contracts";
import { ControlTowerCommand } from "../inbound-contracts";
import { Airplane } from "../../airplane/outbound-contracts";

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
