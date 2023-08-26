import { Invoice } from ".";
import { InvoiceVisitor } from "../contracts";
import { EmailVisitor, SlackVisitor, TaxVisitor } from "../visitors";

export class SalesInvoice extends Invoice {
  readonly buyerName: string;

  constructor(
    buyerName: string,
    invoiceId: string,
    date: Date,
    clientName: string
  ) {
    super(invoiceId, date, clientName);
    this.buyerName = buyerName;
  }

  accept(visitor: InvoiceVisitor): void;
  accept(visitor: TaxVisitor): void;
  accept(visitor: EmailVisitor): void;
  accept(visitor: SlackVisitor): void;
  accept(
    visitor: InvoiceVisitor | TaxVisitor | EmailVisitor | SlackVisitor
  ): void {
    visitor.visit(this);
  }
}
