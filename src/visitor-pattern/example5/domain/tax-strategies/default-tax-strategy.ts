import { TaxStrategy } from "./contracts";

export class DefaultTaxStrategy implements TaxStrategy {
  getTaxRate(): number {
    return 0.06;
  }
}
