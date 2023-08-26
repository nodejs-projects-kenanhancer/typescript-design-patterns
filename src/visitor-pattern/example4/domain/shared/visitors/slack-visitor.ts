import {
  Invoice,
  PurchaseInvoice,
  SalesInvoice,
} from "../../aggregates/invoice";
import { Notifier, SlackPayload } from "../contracts";
import { InvoiceVisitor } from "../contracts/visitor";

export class SlackVisitor implements InvoiceVisitor {
  private notifier: Notifier<SlackPayload>;

  constructor(notifier: Notifier<SlackPayload>) {
    this.notifier = notifier;
  }

  visit(invoice: Invoice): void {
    if (invoice instanceof PurchaseInvoice) {
      this.notifyPurchase(invoice);
    } else if (invoice instanceof SalesInvoice) {
      this.notifySales(invoice);
    }
  }

  private notifyPurchase(purchaseInvoice: PurchaseInvoice): void {
    const supplier = purchaseInvoice.supplierName;
    const totalAmount = this.calculateTotalAmount(purchaseInvoice);

    const message = `:inbox_tray: New purchase from *${supplier}* for a total of $${totalAmount}. Invoice ID: ${purchaseInvoice.invoiceId}.`;

    // Notify a Slack channel dedicated to procurement
    this.notifier.notify({ channel: "#procurement", message });
  }

  private notifySales(salesInvoice: SalesInvoice): void {
    const buyer = salesInvoice.buyerName;
    const totalAmount = this.calculateTotalAmount(salesInvoice);

    const message = `:money_with_wings: New sale to *${buyer}* for a total of $${totalAmount}. Invoice ID: ${salesInvoice.invoiceId}.`;

    // Notify a Slack channel dedicated to sales
    this.notifier.notify({ channel: "#sales", message });
  }

  private calculateTotalAmount(invoice: Invoice): string {
    const totalAmount = invoice.items.reduce(
      (sum, item) => sum + item.total,
      0
    );
    return `$${totalAmount.toFixed(2)}`;
  }
}
