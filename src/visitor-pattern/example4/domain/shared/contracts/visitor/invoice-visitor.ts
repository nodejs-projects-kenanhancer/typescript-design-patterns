import { Invoice } from "../../../aggregates/invoice";

export interface InvoiceVisitor {
  visit(invoice: Invoice): void;
}
