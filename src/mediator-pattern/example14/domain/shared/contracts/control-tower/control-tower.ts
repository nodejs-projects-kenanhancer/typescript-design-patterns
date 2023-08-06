import { Gate, Runway } from "../../../aggregates/control-tower/entities";
import { AirplaneMediator } from "../../../shared/contracts";

export interface ControlTower {
  runways: Runway[];
  gates: Gate[];

  register(airplane: AirplaneMediator): void;
}
