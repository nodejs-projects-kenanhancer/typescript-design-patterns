export class MaintenanceStatus {
  lastMaintenanceDate: Date;
  nextMaintenanceDate: Date;

  constructor(lastMaintenanceDate: Date, nextMaintenanceDate: Date) {
    this.lastMaintenanceDate = lastMaintenanceDate;
    this.nextMaintenanceDate = nextMaintenanceDate;
  }
}
