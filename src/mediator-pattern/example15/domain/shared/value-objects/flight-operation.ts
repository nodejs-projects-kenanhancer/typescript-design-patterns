import { FlightAction, PermissionStatus } from "../enums";

export class FlightOperation {
  action: FlightAction;
  permission: PermissionStatus;

  constructor(
    action: FlightAction,
    permission: PermissionStatus = PermissionStatus.NONE
  ) {
    this.action = action;
    this.permission = permission;
  }
}
