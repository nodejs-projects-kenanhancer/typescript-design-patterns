import { TaxStrategy } from "./tax-strategy";

export class AppleTaxStrategy implements TaxStrategy {
  getTaxRate(): number {
    return 0.05;
  }
}
