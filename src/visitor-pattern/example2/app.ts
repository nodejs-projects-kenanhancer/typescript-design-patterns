interface Product {
  accept(visitor: ProductVisitor): void;
}

interface ProductVisitor {
  visit(book: Book): void;
  visit(fruit: Fruit): void;
}

class Book implements Product {
  title: string;
  author: string;
  isbn: string;

  constructor(title: string, author: string, isbn: string) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }

  accept(visitor: ProductVisitor): void {
    visitor.visit(this);
  }
}

class Fruit implements Product {
  name: string;
  expiryDate: Date;

  constructor(name: string, expiryDate: Date) {
    this.name = name;
    this.expiryDate = expiryDate;
  }

  accept(visitor: ProductVisitor): void {
    visitor.visit(this);
  }
}

interface Visitor {
  visit(purchaseRecord: PurchaseRecord): void;
}

interface Visitable {
  accept(visitor: Visitor): void;
}

class PurchaseRecord implements Visitable {
  productName: string;
  price: number;
  quantity: number;

  constructor(productName: string, price: number, quantity: number) {
    this.productName = productName;
    this.price = price;
    this.quantity = quantity;
  }

  accept(visitor: Visitor): void {}
}

class StockVisitor implements ProductVisitor {
  private productPurchases: Map<string, PurchaseRecord[]> = new Map();

  visit(book: Book): void;
  visit(fruit: Fruit): void;
  visit(product: Book | Fruit): void {
    if (product instanceof Book) {
      this.calculateBookStock(product);
    } else if (product instanceof Fruit) {
      this.calculateFruitStock(product);
    }
  }

  private calculateBookStock(book: Book) {
    this.addToPurchases(book.isbn, new PurchaseRecord(book.isbn, 0, 0));
  }

  private calculateFruitStock(fruit: Fruit) {}

  private addToPurchases(key: string, purchaseDetail: PurchaseRecord) {
    const existing = this.productPurchases.get(key) || [];

    existing.push(purchaseDetail);

    this.productPurchases.set(key, existing);
  }
}

const harryPotterPurchase1 = new Book(
  "Harry Potter",
  "J.K. Rowling",
  "1234567890"
);

const harryPotterPurchase2 = new Book(
  "Harry Potter",
  "J.K. Rowling",
  "1234567890"
);

const harryPotterPurchase3 = new Book(
  "Harry Potter",
  "J.K. Rowling",
  "1234567890"
);

const applePurchase1 = new Fruit("Apple", new Date());

const applePurchase2 = new Fruit("Apple", new Date());

class InventoryManager {
  private productPurchases: Map<string, PurchaseRecord[]> = new Map();

  purchaseProduct(purchaseRecord: PurchaseRecord) {
    const existingPurchases =
      this.productPurchases.get(purchaseRecord.productName) || [];

    existingPurchases.push(purchaseRecord);

    this.productPurchases.set(purchaseRecord.productName, existingPurchases);
  }
}

const inventoryManager = new InventoryManager();

inventoryManager.purchaseProduct(new PurchaseRecord("Harry Potter", 100, 2));

inventoryManager.purchaseProduct(new PurchaseRecord("Apple", 2, 10));

type InvoiceRecord = {
  subTotal: number;
  vat: number;
  total: number;
};

class PurchaseInvoiceVisitor implements Visitor {
  private _invoiceNumber: string;
  private _companyName: string;
  private _purchaseDate: Date;
  private _vatRate: number;
  private _invoiceRecord: InvoiceRecord = {
    subTotal: 0,
    total: 0,
    vat: 0,
  };

  get invoiceNumber() {
    return this._invoiceNumber;
  }

  get companyName() {
    return this._companyName;
  }

  get purchaseDate() {
    return this._purchaseDate;
  }

  get vatRate() {
    return this._vatRate;
  }

  get invoiceRecord() {
    return this._invoiceRecord;
  }

  constructor(
    invoiceNumber: string,
    companyName: string,
    purchaseDate: Date,
    vatRate: number
  ) {
    this._invoiceNumber = invoiceNumber;
    this._companyName = companyName;
    this._purchaseDate = purchaseDate;
    this._vatRate = vatRate;
  }

  visit(purchaseRecord: PurchaseRecord): void {
    const { price, quantity } = purchaseRecord;

    const totalPrice = price * quantity;

    const vat = (totalPrice * this._vatRate) / 100;

    this._invoiceRecord.subTotal += totalPrice;

    this._invoiceRecord.vat += vat;

    this._invoiceRecord.total += totalPrice + vat;
  }
}

class InventoryVisitor implements Visitor {
  private _products: Map<string, number> = new Map();

  getStockCount(productName: string) {
    return this._products.get(productName);
  }

  visit(purchaseRecord: PurchaseRecord): void {
    const { productName } = purchaseRecord;

    let stockCount = (this._products.get(productName) || 0) + 1;

    this._products.set(productName, stockCount);
  }
}

const purchaseInvoiceVisitor = new PurchaseInvoiceVisitor(
  "62608",
  "ABC Company",
  new Date(),
  20
);

const stockVisitorV2 = new InventoryVisitor();

const purchase1 = new PurchaseRecord("Harry Potter", 100, 2);

const purchase2 = new PurchaseRecord("Apple", 2, 10);

purchase1.accept(purchaseInvoiceVisitor);

purchase2.accept(purchaseInvoiceVisitor);

purchase1.accept(stockVisitorV2);

purchase2.accept(stockVisitorV2);

const appleStockCount = stockVisitorV2.getStockCount("Apple");

console.log(`Apple stock count is ${appleStockCount}`);

export {};
