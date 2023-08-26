import { NotifierMediator } from "../../../infrastructure/notifiers/contracts";
import { InvoiceVisitor } from "../contracts";
import { Invoice, PurchaseInvoice, SalesInvoice } from "../entities";

export class EmailVisitor implements InvoiceVisitor {
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

  private notifyPurchase(purchaseInvoice: PurchaseInvoice) {
    const supplier = purchaseInvoice.supplierName;
    const totalAmount = this.calculateTotalAmount(purchaseInvoice);

    // Notify procurement department about the new purchase.
    const subject = `New Purchase from ${supplier}`;
    const message = `New purchase from ${supplier} for a total of $${totalAmount}. Invoice ID: ${purchaseInvoice.invoiceId}.`;

    // Email to the procurement department
    this.notificationMediator.notify({
      type: "email",
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
    this.notificationMediator.notify({
      type: "email",
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
