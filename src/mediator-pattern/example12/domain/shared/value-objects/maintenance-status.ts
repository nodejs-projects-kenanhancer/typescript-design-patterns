import { MaintenanceStatusType } from "../enums";

export class MaintenanceStatus {
  status: MaintenanceStatusType;
  details: string; // More detailed information about the maintenance status
}
