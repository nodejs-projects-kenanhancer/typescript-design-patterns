import { EmergencyInfo } from "./emergency-info";
import { EmergencySeverity, EmergencyType, MalfunctionType } from "../../enums";

export class MalfunctionEmergency extends EmergencyInfo {
  malfunctionPart: string; // Equipment or system that caused the emergency
  malfunctionType: MalfunctionType;

  constructor(
    code: string,
    description: string,
    severity: EmergencySeverity,
    malfunctionPart: string,
    malfunctionType: MalfunctionType
  ) {
    super(code, description, EmergencyType.MALFUNCTION, severity);

    this.malfunctionPart = malfunctionPart;
    this.malfunctionType = malfunctionType;
  }
}
