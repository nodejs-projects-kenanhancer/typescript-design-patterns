import { EmergencyInfo } from "./emergency-info";
import { EmergencySeverity, EmergencyType } from "../../enums";

export class FuelLeakEmergency extends EmergencyInfo {
  leakLocation: string; // Where the fuel is leaking

  constructor(
    code: string,
    description: string,
    severity: EmergencySeverity,
    leakLocation: string
  ) {
    super(code, description, EmergencyType.FUEL_LEAK, severity);

    this.leakLocation = leakLocation;
  }
}
