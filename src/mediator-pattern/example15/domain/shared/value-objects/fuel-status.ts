export class FuelStatus {
  level: number;
  maxCapacity: number;

  constructor(level: number, maxCapacity: number) {
    this.level = level;
    this.maxCapacity = maxCapacity;
  }
}
