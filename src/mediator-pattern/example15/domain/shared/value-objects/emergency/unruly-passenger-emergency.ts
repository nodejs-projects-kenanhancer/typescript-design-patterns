import { EmergencyInfo } from "./emergency-info";
import { EmergencySeverity, EmergencyType } from "../../enums";

export class UnrulyPassengerEmergency extends EmergencyInfo {
  unrulyPassengerCount: number;

  constructor(
    code: string,
    description: string,
    severity: EmergencySeverity,
    unrulyPassengerCount: number
  ) {
    super(code, description, EmergencyType.UNRULY_PASSENGER, severity);

    this.unrulyPassengerCount = unrulyPassengerCount;
  }
}
