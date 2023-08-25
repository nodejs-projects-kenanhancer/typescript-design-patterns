interface VisitableInvoice {
  accept(visitor: InvoiceVisitor): void;
  accept(visitor: TaxVisitor): void;
  accept(visitor: NotificationVisitor): void;
  accept(visitor: SlackVisitor): void;
}

interface InvoiceVisitor {
  visit(purchaseInvoice: PurchaseInvoice): void;
  visit(salesInvoice: SalesInvoice): void;
}

class InvoiceItem {
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

abstract class Invoice implements VisitableInvoice {
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
  abstract accept(visitor: NotificationVisitor): void;
  abstract accept(visitor: SlackVisitor): void;
}

class PurchaseInvoice extends Invoice {
  readonly supplierName: string;

  constructor(
    supplierName: string,
    invoiceId: string,
    date: Date,
    clientName: string
  ) {
    super(invoiceId, date, clientName);
    this.supplierName = supplierName;
  }

  accept(visitor: InvoiceVisitor): void;
  accept(visitor: TaxVisitor): void;
  accept(visitor: NotificationVisitor): void;
  accept(visitor: SlackVisitor): void;
  accept(
    visitor: InvoiceVisitor | TaxVisitor | NotificationVisitor | SlackVisitor
  ): void {
    visitor.visit(this);
  }
}

class SalesInvoice extends Invoice {
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
  accept(visitor: NotificationVisitor): void;
  accept(visitor: SlackVisitor): void;
  accept(
    visitor: InvoiceVisitor | TaxVisitor | NotificationVisitor | SlackVisitor
  ): void {
    visitor.visit(this);
  }
}

class StockVisitor implements InvoiceVisitor {
  private products: Map<string, number> = new Map();

  visit(purchaseInvoice: PurchaseInvoice): void;
  visit(salesInvoice: SalesInvoice): void;
  visit(invoice: PurchaseInvoice | SalesInvoice): void {
    if (invoice instanceof PurchaseInvoice) {
      this.increaseItemStockCount(invoice);
    } else if (invoice instanceof SalesInvoice) {
      this.decreaseItemStockCount(invoice);
    }
  }

  private increaseItemStockCount(invoice: PurchaseInvoice) {
    const sortedInvoiceItems = invoice.items.sort((a, b) =>
      a.description.localeCompare(b.description)
    );

    for (const invoiceItem of sortedInvoiceItems) {
      const name = invoiceItem.description;
      const stockCount = this.getStockCount(name);

      this.products.set(name, stockCount + invoiceItem.quantity);
    }
  }

  private decreaseItemStockCount(invoice: SalesInvoice) {
    const sortedInvoiceItems = invoice.items.sort((a, b) =>
      a.description.localeCompare(b.description)
    );

    for (const invoiceItem of sortedInvoiceItems) {
      const name = invoiceItem.description;
      const stockCount = this.getStockCount(name);

      this.products.set(name, stockCount - invoiceItem.quantity);
    }
  }

  getStockCount(productName: string) {
    const stockCount = this.products.get(productName) || 0;

    return stockCount;
  }
}

class TaxVisitor implements InvoiceVisitor {
  private _purchaseTaxTotal: number = 0;
  private _salesTaxTotal: number = 0;
  private taxStrategies: Record<string, TaxStrategy>;

  get salesTaxTotal(): number {
    return this._salesTaxTotal;
  }

  get purchaseTaxTotal(): number {
    return this._purchaseTaxTotal;
  }

  constructor(taxStrategies: Record<string, TaxStrategy>) {
    this.taxStrategies = taxStrategies;
  }

  visit(purchaseInvoice: PurchaseInvoice): void;
  visit(salesInvoice: SalesInvoice): void;
  visit(invoice: PurchaseInvoice | SalesInvoice): void {
    if (invoice instanceof PurchaseInvoice) {
      this.calculatePurchaseTax(invoice);
    } else if (invoice instanceof SalesInvoice) {
      this.calculateSalesTax(invoice);
    }
  }

  private calculatePurchaseTax(invoice: PurchaseInvoice) {
    for (const item of invoice.items) {
      const taxRate = this.getTaxRateForItem(item.description);
      this._purchaseTaxTotal += item.total * taxRate;
    }
  }

  private calculateSalesTax(invoice: SalesInvoice) {
    for (const item of invoice.items) {
      const taxRate = this.getTaxRateForItem(item.description);
      this._salesTaxTotal += item.total * taxRate;
    }
  }

  private getTaxRateForItem(itemDescription: string) {
    return (
      this.taxStrategies[itemDescription] || new DefaultTaxStrategy()
    ).getTaxRate();
  }
}

interface EmailService {
  send(to: string, subject: string, message: string): void;
}

class SimpleEmailService implements EmailService {
  send(to: string, subject: string, message: string): void {
    // In a real-world scenario, we'd integrate with an actual email sending API here.
    console.log(
      `Email sent to ${to} with subject "${subject}" and message: "${message}"`
    );
  }
}

class NotificationVisitor implements InvoiceVisitor {
  private emailService: EmailService;

  constructor(emailService: EmailService) {
    this.emailService = emailService;
  }

  visit(purchaseInvoice: PurchaseInvoice): void;
  visit(salesInvoice: SalesInvoice): void;
  visit(invoice: PurchaseInvoice | SalesInvoice): void {
    if (invoice instanceof PurchaseInvoice) {
      this.notifyPurchase(invoice);
    } else if (invoice instanceof SalesInvoice) {
      this.notifySales(invoice);
    }
  }

  private notifyPurchase(purchaseInvoice: PurchaseInvoice) {
    const supplier = purchaseInvoice.supplierName;
    const totalAmount = purchaseInvoice.items.reduce(
      (sum, item) => sum + item.total,
      0
    );

    // Notify procurement department about the new purchase.
    const subject = `New Purchase from ${supplier}`;
    const message = `New purchase from ${supplier} for a total of $${totalAmount.toFixed(
      2
    )}. Invoice ID: ${purchaseInvoice.invoiceId}.`;

    // Email to the procurement department
    this.emailService.send("procurement@example.com", subject, message);
  }

  private notifySales(salesInvoice: SalesInvoice) {
    const buyer = salesInvoice.buyerName;
    const totalAmount = salesInvoice.items.reduce(
      (sum, item) => sum + item.total,
      0
    );

    // Notify sales department about the new sale.
    const subject = `New Sale to ${buyer}`;
    const message = `New sale to ${buyer} for a total of $${totalAmount.toFixed(
      2
    )}. Invoice ID: ${salesInvoice.invoiceId}.`;

    // Email to the sales department
    this.emailService.send("sales@example.com", subject, message);
  }
}

interface SlackNotifier {
  sendMessage(channel: string, message: string): void;
}

class SimpleSlackNotifier implements SlackNotifier {
  // This is a mock-up, in a real-world scenario, this method would send a POST request
  // to Slack's webhook URL to send the message.
  sendMessage(channel: string, message: string): void {
    console.log(`Message sent to Slack channel ${channel}: ${message}`);
  }
}

class SlackVisitor implements InvoiceVisitor {
  private slackNotifier: SlackNotifier;

  constructor(slackNotifier: SlackNotifier) {
    this.slackNotifier = slackNotifier;
  }

  visit(purchaseInvoice: PurchaseInvoice): void;
  visit(salesInvoice: SalesInvoice): void;
  visit(invoice: PurchaseInvoice | SalesInvoice): void {
    if (invoice instanceof PurchaseInvoice) {
      this.notifyPurchase(invoice);
    } else if (invoice instanceof SalesInvoice) {
      this.notifySales(invoice);
    }
  }

  private notifyPurchase(purchaseInvoice: PurchaseInvoice): void {
    const supplier = purchaseInvoice.supplierName;
    const totalAmount = purchaseInvoice.items.reduce(
      (sum, item) => sum + item.total,
      0
    );

    const message = `:inbox_tray: New purchase from *${supplier}* for a total of $${totalAmount.toFixed(
      2
    )}. Invoice ID: ${purchaseInvoice.invoiceId}.`;

    // Notify a Slack channel dedicated to procurement
    this.slackNotifier.sendMessage("#procurement", message);
  }

  private notifySales(salesInvoice: SalesInvoice): void {
    const buyer = salesInvoice.buyerName;
    const totalAmount = salesInvoice.items.reduce(
      (sum, item) => sum + item.total,
      0
    );

    const message = `:money_with_wings: New sale to *${buyer}* for a total of $${totalAmount.toFixed(
      2
    )}. Invoice ID: ${salesInvoice.invoiceId}.`;

    // Notify a Slack channel dedicated to sales
    this.slackNotifier.sendMessage("#sales", message);
  }
}

interface TaxStrategy {
  getTaxRate(): number;
}

class AppleTaxStrategy implements TaxStrategy {
  getTaxRate(): number {
    return 0.05;
  }
}

class OrangeTaxStrategy implements TaxStrategy {
  getTaxRate(): number {
    return 0.07;
  }
}

class DefaultTaxStrategy implements TaxStrategy {
  getTaxRate(): number {
    return 0.06;
  }
}

class StockManagementDemo {
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

    const notificationVisitor = new NotificationVisitor(
      new SimpleEmailService()
    );

    const slackVisitor = new SlackVisitor(new SimpleSlackNotifier());

    purchaseInvoice.accept(stockVisitor);

    purchaseInvoice.accept(taxVisitor);

    purchaseInvoice.accept(notificationVisitor);

    purchaseInvoice.accept(slackVisitor);
  }
}

StockManagementDemo.main();

export {};
