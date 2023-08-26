import {
  EmailVisitor,
  PurchaseInvoice,
  SlackVisitor,
  StockVisitor,
  TaxVisitor,
} from "../domain/invoice";
import { InvoiceItem } from "../domain/invoice/value-objects";
import {
  AppleTaxStrategy,
  OrangeTaxStrategy,
  TaxStrategy,
} from "../domain/tax-strategies";
import { EmailNotifier, SlackNotifier } from "../infrastructure/notifiers";

export class StockManagementDemo {
  static main() {
    const purchaseInvoice = new PurchaseInvoice(
      "ABC Company",
      "PI001",
      new Date(),
      "John Doe"
    );

    const item1 = new InvoiceItem("Apple", 5, 0.5);
    const item2 = new InvoiceItem("Orange", 3, 0.75);

    purchaseInvoice.addItem(item1);
    purchaseInvoice.addItem(item2);

    const stockVisitor = new StockVisitor();

    const taxStrategies: Record<string, TaxStrategy> = {
      Apple: new AppleTaxStrategy(),
      Orange: new OrangeTaxStrategy(),
    };

    const taxVisitor = new TaxVisitor(taxStrategies);

    const emailNotificationVisitor = new EmailVisitor(new EmailNotifier());

    const slackNotificationVisitor = new SlackVisitor(new SlackNotifier());

    purchaseInvoice.accept(stockVisitor);

    purchaseInvoice.accept(taxVisitor);

    purchaseInvoice.accept(emailNotificationVisitor);

    purchaseInvoice.accept(slackNotificationVisitor);
  }
}
