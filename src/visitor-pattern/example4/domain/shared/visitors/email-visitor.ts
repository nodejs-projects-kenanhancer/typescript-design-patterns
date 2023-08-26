import {
  Invoice,
  PurchaseInvoice,
  SalesInvoice,
} from "../../aggregates/invoice";
import { EmailPayload, Notifier } from "../contracts";
import { InvoiceVisitor } from "../contracts/visitor";

export class EmailVisitor implements InvoiceVisitor {
  private notifier: Notifier<EmailPayload>;

  constructor(notifier: Notifier<EmailPayload>) {
    this.notifier = notifier;
  }

  visit(invoice: Invoice): void {
    if (invoice instanceof PurchaseInvoice) {
      this.notifyPurchase(invoice);
    } else if (invoice instanceof SalesInvoice) {
      this.notifySales(invoice);
    }
  }

  private notifyPurchase(purchaseInvoice: PurchaseInvoice) {
    const supplier = purchaseInvoice.supplierName;
    const totalAmount = this.calculateTotalAmount(purchaseInvoice);

    // Notify procurement department about the new purchase.
    const subject = `New Purchase from ${supplier}`;
    const message = `New purchase from ${supplier} for a total of $${totalAmount}. Invoice ID: ${purchaseInvoice.invoiceId}.`;

    // Email to the procurement department
    this.notifier.notify({
      to: "procurement@example.com",
      subject,
      message,
    });
  }

  private notifySales(salesInvoice: SalesInvoice) {
    const buyer = salesInvoice.buyerName;
    const totalAmount = this.calculateTotalAmount(salesInvoice);

    // Notify sales department about the new sale.
    const subject = `New Sale to ${buyer}`;
    const message = `New sale to ${buyer} for a total of $${totalAmount}. Invoice ID: ${salesInvoice.invoiceId}.`;

    // Email to the sales department
    this.notifier.notify({
      to: "sales@example.com",
      subject,
      message,
    });
  }

  private calculateTotalAmount(invoice: Invoice): string {
    const totalAmount = invoice.items.reduce(
      (sum, item) => sum + item.total,
      0
    );
    return `$${totalAmount.toFixed(2)}`;
  }
}
