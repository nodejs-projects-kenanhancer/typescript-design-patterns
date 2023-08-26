import { TaxStrategy } from "./tax-strategy";

export class DefaultTaxStrategy implements TaxStrategy {
  getTaxRate(): number {
    return 0.06;
  }
}
