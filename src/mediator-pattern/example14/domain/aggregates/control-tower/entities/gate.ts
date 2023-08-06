import { Airplane } from "../../../shared/contracts";
import { GateStatus } from "../../../shared/enums";

export class Gate {
  name: string;
  capacity: number; // maximum size of the airplane it can handle
  currentStatus: GateStatus;
  currentAirplane?: Airplane; // current airplane occupying the gate, null if no airplane is present

  constructor(
    name: string,
    capacity: number,
    currentStatus: GateStatus = GateStatus.AVAILABLE
  ) {
    this.name = name;
    this.capacity = capacity;
    this.currentStatus = currentStatus;
    this.currentAirplane = null;
  }

  isAvailableForAirplane(airplane: Airplane): boolean {
    return (
      this.currentStatus === GateStatus.AVAILABLE &&
      airplane.status.passengerCount <= this.capacity
    );
  }

  occupy(airplane: Airplane): void {
    if (!this.isAvailableForAirplane(airplane)) {
      throw new Error("Gate is not available for the airplane.");
    }

    this.currentAirplane = airplane;
    this.currentStatus = GateStatus.OCCUPIED;
  }

  release(): void {
    this.currentAirplane = null;
    this.currentStatus = GateStatus.AVAILABLE;
  }

  startCleaning(): void {
    this.currentStatus = GateStatus.CLEANING_IN_PROGRESS;
  }

  endCleaning(): void {
    this.currentStatus = GateStatus.AVAILABLE;
  }

  startMaintenance(): void {
    this.currentStatus = GateStatus.UNDER_MAINTENANCE;
  }

  endMaintenance(): void {
    this.currentStatus = GateStatus.AVAILABLE;
  }
}
