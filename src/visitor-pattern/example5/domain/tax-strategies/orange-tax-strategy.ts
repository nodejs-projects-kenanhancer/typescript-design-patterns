import { TaxStrategy } from "./tax-strategy";

export class OrangeTaxStrategy implements TaxStrategy {
  getTaxRate(): number {
    return 0.07;
  }
}
