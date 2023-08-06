import { RunwayConditionStatus } from "../enums";

export class RunwayCondition {
  runway: string; // Runway identifier
  condition: RunwayConditionStatus;

  constructor(runway: string, condition: RunwayConditionStatus) {
    this.runway = runway;
    this.condition = condition;
  }
}
