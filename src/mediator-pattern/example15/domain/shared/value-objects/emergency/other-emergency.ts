import { EmergencyInfo } from "./emergency-info";
import { EmergencySeverity, EmergencyType } from "../../enums";

export class OtherEmergency extends EmergencyInfo {
  additionalDetails?: string; // Optional additional details

  constructor(
    code: string,
    description: string,
    severity: EmergencySeverity,
    additionalDetails?: string
  ) {
    super(code, description, EmergencyType.OTHER, severity);

    this.additionalDetails = additionalDetails;
  }
}
