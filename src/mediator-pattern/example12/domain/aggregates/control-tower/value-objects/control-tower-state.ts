import { Runway } from "../../../shared/value-objects";

export class ControlTowerState {
  runways: Runway[];

  constructor(runways: Runway[]) {
    this.runways = runways;
  }
}
