import { InvoiceVisitor, VisitableInvoice } from "../contracts";
import { InvoiceItem } from "../value-objects";
import { EmailVisitor, SlackVisitor, TaxVisitor } from "../visitors";

export abstract class Invoice implements VisitableInvoice {
  readonly invoiceId: string;
  readonly date: Date;
  readonly clientName: string;
  readonly items: InvoiceItem[] = [];

  constructor(invoiceId: string, date: Date, clientName: string) {
    this.invoiceId = invoiceId;
    this.date = date;
    this.clientName = clientName;
  }

  addItem(invoiceItem: InvoiceItem): void {
    this.items.push(invoiceItem);
  }

  abstract accept(visitor: InvoiceVisitor): void;
  abstract accept(visitor: TaxVisitor): void;
  abstract accept(visitor: EmailVisitor): void;
  abstract accept(visitor: SlackVisitor): void;
}
