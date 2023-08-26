import { Invoice } from "../entities";

export interface InvoiceVisitor {
  visit(invoice: Invoice): void;
}
