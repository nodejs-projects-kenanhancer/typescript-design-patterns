import { DefaultTaxStrategy, TaxStrategy } from "../../tax-strategies";
import { InvoiceVisitor } from "../contracts";
import { Invoice, PurchaseInvoice, SalesInvoice } from "../entities";

export class TaxVisitor implements InvoiceVisitor {
  private _purchaseTaxTotal: number = 0;
  private _salesTaxTotal: number = 0;
  private taxStrategies: Record<string, TaxStrategy>;

  get salesTaxTotal(): number {
    return this._salesTaxTotal;
  }

  get purchaseTaxTotal(): number {
    return this._purchaseTaxTotal;
  }

  constructor(taxStrategies: Record<string, TaxStrategy>) {
    this.taxStrategies = taxStrategies;
  }

  visit(invoice: Invoice): void {
    if (invoice instanceof PurchaseInvoice) {
      this.calculatePurchaseTax(invoice);
    } else if (invoice instanceof SalesInvoice) {
      this.calculateSalesTax(invoice);
    }
  }

  private calculatePurchaseTax(invoice: PurchaseInvoice) {
    for (const item of invoice.items) {
      const taxRate = this.getTaxRateForItem(item.description);
      this._purchaseTaxTotal += item.total * taxRate;
    }
  }

  private calculateSalesTax(invoice: SalesInvoice) {
    for (const item of invoice.items) {
      const taxRate = this.getTaxRateForItem(item.description);
      this._salesTaxTotal += item.total * taxRate;
    }
  }

  private getTaxRateForItem(itemDescription: string) {
    return (
      this.taxStrategies[itemDescription] || new DefaultTaxStrategy()
    ).getTaxRate();
  }
}
