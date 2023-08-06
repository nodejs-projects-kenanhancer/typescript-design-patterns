import { FuelType, FuelUnit } from "../enums";

export class FuelInfo {
  amount: number;
  type: FuelType;
  unit: FuelUnit;

  constructor(amount: number, type: FuelType, unit: FuelUnit) {
    this.amount = amount;
    this.type = type;
    this.unit = unit;
  }
}
