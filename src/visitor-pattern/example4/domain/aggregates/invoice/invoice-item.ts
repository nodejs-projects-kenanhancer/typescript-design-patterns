export class InvoiceItem {
  readonly description: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly total: number;

  constructor(description: string, quantity: number, unitPrice: number) {
    this.description = description;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.total = quantity * unitPrice;
  }
}
