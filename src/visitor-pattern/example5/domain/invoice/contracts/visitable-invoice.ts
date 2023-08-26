import { TaxVisitor, EmailVisitor, SlackVisitor } from "../visitors";
import { InvoiceVisitor } from "./invoice-visitor";

export interface VisitableInvoice {
  accept(visitor: InvoiceVisitor): void;
  accept(visitor: TaxVisitor): void;
  accept(visitor: EmailVisitor): void;
  accept(visitor: SlackVisitor): void;
}
