import { TaxStrategy } from "./contracts";

export class AppleTaxStrategy implements TaxStrategy {
  getTaxRate(): number {
    return 0.05;
  }
}
