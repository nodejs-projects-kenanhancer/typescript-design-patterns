import { Airplane } from "../../colleague";
import { ControlTower } from "../control-tower";

export interface ControlTowerCommand {
  execute(
    from: Airplane,
    controlTower: ControlTower,
    details?: Record<string, any>
  ): void;
}
