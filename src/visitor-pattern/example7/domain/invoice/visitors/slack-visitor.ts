import { NotifierMediator } from "../../../infrastructure/notifiers/contracts";
import { InvoiceVisitor } from "../contracts";
import { Invoice, PurchaseInvoice, SalesInvoice } from "../entities";

export class SlackVisitor implements InvoiceVisitor {
  private notificationMediator: NotifierMediator;

  constructor(notificationMediator: NotifierMediator) {
    this.notificationMediator = notificationMediator;
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
    this.notificationMediator.notify({
      type: "slack",
      channel: "#procurement",
      message,
    });
  }

  private notifySales(salesInvoice: SalesInvoice): void {
    const buyer = salesInvoice.buyerName;
    const totalAmount = this.calculateTotalAmount(salesInvoice);

    const message = `:money_with_wings: New sale to *${buyer}* for a total of $${totalAmount}. Invoice ID: ${salesInvoice.invoiceId}.`;

    // Notify a Slack channel dedicated to sales
    this.notificationMediator.notify({
      type: "slack",
      channel: "#sales",
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
