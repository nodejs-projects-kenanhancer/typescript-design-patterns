import { EmergencyInfo } from "./emergency-info";
import { EmergencySeverity, EmergencyType } from "../../enums";

export class MedicalEmergency extends EmergencyInfo {
  patientCount: number;
  symptoms: string[];

  constructor(
    code: string,
    description: string,
    severity: EmergencySeverity,
    patientCount: number,
    symptoms: string[]
  ) {
    super(code, description, EmergencyType.MEDICAL, severity);

    this.patientCount = patientCount;
    this.symptoms = symptoms;
  }
}
