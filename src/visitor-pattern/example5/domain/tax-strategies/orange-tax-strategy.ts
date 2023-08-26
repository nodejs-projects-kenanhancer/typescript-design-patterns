import { TaxStrategy } from "./contracts";

export class OrangeTaxStrategy implements TaxStrategy {
  getTaxRate(): number {
    return 0.07;
  }
}
