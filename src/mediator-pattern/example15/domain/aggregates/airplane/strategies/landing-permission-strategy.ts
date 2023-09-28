import { PermissionStrategy } from "../contracts";

export class LandingPermissionStrategy implements PermissionStrategy {
  receivePermission(): void {
    throw new Error("Method not implemented.");
  }
}
