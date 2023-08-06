import { EmergencySeverity, EmergencyType } from "../../enums";

export abstract class EmergencyInfo {
  code: string;
  description: string;
  type: EmergencyType;
  severity: EmergencySeverity;

  constructor(
    code: string,
    description: string,
    type: EmergencyType,
    severity: EmergencySeverity
  ) {
    this.code = code;
    this.description = description;
    this.type = type;
    this.severity = severity;
  }
}
