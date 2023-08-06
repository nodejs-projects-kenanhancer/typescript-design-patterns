import { RunwayStatus } from "../enums";
import { RunwayCondition } from "../value-objects";

export class Runway {
  name: string;
  status: RunwayStatus;
  condition: RunwayCondition;
  maxSize: number;

  constructor(name: string, status: RunwayStatus, maxSize: number) {
    this.name = name;
    this.status = status;
    this.maxSize = maxSize;
  }
}
