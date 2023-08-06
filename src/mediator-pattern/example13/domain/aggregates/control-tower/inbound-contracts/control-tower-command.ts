import { ControlTower } from "../outbound-contracts";
import { Airplane } from "../../airplane/outbound-contracts";

export interface ControlTowerCommand {
  execute(
    from: Airplane,
    controlTower: ControlTower,
    details?: Record<string, any>
  ): void;
}
