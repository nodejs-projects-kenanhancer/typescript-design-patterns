import {
  Invoice,
  PurchaseInvoice,
  SalesInvoice,
} from "../../aggregates/invoice";
import { InvoiceVisitor } from "../contracts/visitor";

export class StockVisitor implements InvoiceVisitor {
  private products: Map<string, number> = new Map();

  visit(invoice: Invoice): void {
    if (invoice instanceof PurchaseInvoice) {
      this.increaseItemStockCount(invoice);
    } else if (invoice instanceof SalesInvoice) {
      this.decreaseItemStockCount(invoice);
    }
  }

  private increaseItemStockCount(invoice: PurchaseInvoice) {
    const sortedInvoiceItems = invoice.items.sort((a, b) =>
      a.description.localeCompare(b.description)
    );

    for (const invoiceItem of sortedInvoiceItems) {
      const name = invoiceItem.description;
      const stockCount = this.getStockCount(name);

      this.products.set(name, stockCount + invoiceItem.quantity);
    }
  }

  private decreaseItemStockCount(invoice: SalesInvoice) {
    const sortedInvoiceItems = invoice.items.sort((a, b) =>
      a.description.localeCompare(b.description)
    );

    for (const invoiceItem of sortedInvoiceItems) {
      const name = invoiceItem.description;
      const stockCount = this.getStockCount(name);

      this.products.set(name, stockCount - invoiceItem.quantity);
    }
  }

  getStockCount(productName: string) {
    const stockCount = this.products.get(productName) || 0;

    return stockCount;
  }
}
