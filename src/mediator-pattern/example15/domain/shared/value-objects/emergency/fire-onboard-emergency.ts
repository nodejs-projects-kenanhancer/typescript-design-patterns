import { EmergencyInfo } from "./emergency-info";
import { EmergencySeverity, EmergencyType } from "../../enums";

export class FireOnBoardEmergency extends EmergencyInfo {
  fireLocation: string; // Where the fire started

  constructor(
    code: string,
    description: string,
    severity: EmergencySeverity,
    fireLocation: string
  ) {
    super(code, description, EmergencyType.FIRE_ON_BOARD, severity);

    this.fireLocation = fireLocation;
  }
}
