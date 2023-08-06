import {
  EmergencySeverity,
  EmergencyThreatLevel,
  EmergencyType,
} from "../../enums";
import { EmergencyInfo } from "./emergency-info";

export class SecurityEmergency extends EmergencyInfo {
  threatLevel: EmergencyThreatLevel;
  involvedPersonCount: number;

  constructor(
    code: string,
    description: string,
    severity: EmergencySeverity,
    threatLevel: EmergencyThreatLevel,
    involvedPersonCount: number
  ) {
    super(code, description, EmergencyType.SECURITY_THREAT, severity);

    this.threatLevel = threatLevel;
    this.involvedPersonCount = involvedPersonCount;
  }
}
