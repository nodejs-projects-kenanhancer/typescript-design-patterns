interface Product {
  name: string;
  price: number;
  accept(visitor: ProductVisitor): void;
}

interface ProductVisitor {
  visit(book: Book): void;
  visit(fruit: Fruit): void;
  visit(electronic: Electronic): void;
}

class Book implements Product {
  name: string;
  price: number;
  isbn: string;

  constructor(name: string, price: number, isbn: string) {
    this.name = name;
    this.price = price;
    this.isbn = isbn;
  }

  accept(visitor: ProductVisitor): void {
    visitor.visit(this);
  }
}

class Fruit implements Product {
  name: string;
  price: number;
  weight: number;

  constructor(name: string, price: number, weight: number) {
    this.name = name;
    this.price = price;
    this.weight = weight;
  }

  accept(visitor: ProductVisitor): void {
    visitor.visit(this);
  }
}

class Electronic implements Product {
  name: string;
  price: number;
  model: string;

  constructor(name: string, price: number, model: string) {
    this.name = name;
    this.price = price;
    this.model = model;
  }

  accept(visitor: ProductVisitor): void {
    visitor.visit(this);
  }
}

type ProductTaxDetail = {
  names: string[];
  totalTax: number;
};

type ProductTax = {
  books: ProductTaxDetail;
  fruits: ProductTaxDetail;
  electronics: ProductTaxDetail;
};

class TaxCalculatorVisitor implements ProductVisitor {
  private bookTaxRate: number;
  private fruitTaxRate: number;
  private electronicTaxRate: number;
  private _totalTax: ProductTax = {
    books: { names: [], totalTax: 0 },
    fruits: { names: [], totalTax: 0 },
    electronics: { names: [], totalTax: 0 },
  };

  get totalTax() {
    return this._totalTax;
  }

  constructor(
    bookTaxRate: number,
    fruitTaxRate: number,
    electronicTaxRate: number
  ) {
    this.bookTaxRate = bookTaxRate;
    this.fruitTaxRate = fruitTaxRate;
    this.electronicTaxRate = electronicTaxRate;
  }

  visit(book: Book): void;
  visit(fruit: Fruit): void;
  visit(electronic: Electronic): void;
  visit(product: Product): void {
    if (product instanceof Book) {
      this.calculateBooksTax(product);
    } else if (product instanceof Fruit) {
      this.calculateFruitsTax(product);
    } else if (product instanceof Electronic) {
      this.calculateElectronicsTax(product);
    }
  }

  private calculateBooksTax(book: Book) {
    this._totalTax.books.names.push(book.name);
    this._totalTax.books.totalTax += book.price * (this.bookTaxRate / 100);
  }

  private calculateFruitsTax(fruit: Fruit) {
    this._totalTax.fruits.names.push(fruit.name);
    this._totalTax.fruits.totalTax += fruit.price * (this.fruitTaxRate / 100);
  }

  private calculateElectronicsTax(electronic: Electronic) {
    this._totalTax.electronics.names.push(electronic.name);
    this._totalTax.electronics.totalTax +=
      electronic.price * (this.electronicTaxRate / 100);
  }
}

type ProductTotalDiscountedPriceDetail = {
  names: string[];
  totalDiscountedPrice: number;
  discountedPrice: number;
};

type ProductTotalDiscountedPrice = {
  books: ProductTotalDiscountedPriceDetail;
  fruits: ProductTotalDiscountedPriceDetail;
  electronics: ProductTotalDiscountedPriceDetail;
};

class TotalDiscountedPriceCalculatorVisitor implements ProductVisitor {
  private _productDiscount: ProductTotalDiscountedPrice = {
    books: { names: [], discountedPrice: 0, totalDiscountedPrice: 0 },
    fruits: { names: [], discountedPrice: 0, totalDiscountedPrice: 0 },
    electronics: { names: [], discountedPrice: 0, totalDiscountedPrice: 0 },
  };
  private bookDiscount: number;
  private fruitDiscount: number;
  private electronicDiscount: number;

  get productDiscount() {
    return this._productDiscount;
  }

  constructor(
    bookDiscount: number,
    fruitDiscount: number,
    electronicDiscount: number
  ) {
    this.bookDiscount = bookDiscount;
    this.fruitDiscount = fruitDiscount;
    this.electronicDiscount = electronicDiscount;
  }

  visit(book: Book): void;
  visit(fruit: Fruit): void;
  visit(electronic: Electronic): void;
  visit(product: Product): void {
    if (product instanceof Book) {
      this.calculateBooksDiscountedPrice(product);
    } else if (product instanceof Fruit) {
      this.calculateFruitsDiscountedPrice(product);
    } else if (product instanceof Electronic) {
      this.calculateElectronicsDiscountedPrice(product);
    }
  }

  private calculateBooksDiscountedPrice(book: Book) {
    this._productDiscount.books.names.push(book.name);

    const discountedPrice = book.price * (this.bookDiscount / 100);

    this._productDiscount.books.discountedPrice += discountedPrice;
    this._productDiscount.books.totalDiscountedPrice +=
      book.price - discountedPrice;
  }

  private calculateFruitsDiscountedPrice(fruit: Fruit) {
    this._productDiscount.fruits.names.push(fruit.name);

    const discountedPrice = fruit.price * (this.fruitDiscount / 100);

    this._productDiscount.fruits.discountedPrice += discountedPrice;
    this._productDiscount.fruits.totalDiscountedPrice +=
      fruit.price - discountedPrice;
  }

  private calculateElectronicsDiscountedPrice(electronic: Electronic) {
    this._productDiscount.electronics.names.push(electronic.name);

    const discountedPrice = electronic.price * (this.electronicDiscount / 100);

    this._productDiscount.electronics.discountedPrice += discountedPrice;
    this._productDiscount.electronics.totalDiscountedPrice +=
      electronic.price - discountedPrice;
  }
}

type ProductTotalPriceDetail = {
  names: string[];
  total: number;
};

type ProductTotalPrice = {
  books: ProductTotalPriceDetail;
  fruits: ProductTotalPriceDetail;
  electronics: ProductTotalPriceDetail;
};

class TotalPriceCalculatorVisitor implements ProductVisitor {
  private _totalPrice: ProductTotalPrice = {
    books: { names: [], total: 0 },
    fruits: { names: [], total: 0 },
    electronics: { names: [], total: 0 },
  };

  get totalPrice() {
    return this._totalPrice;
  }

  visit(book: Book): void;
  visit(fruit: Fruit): void;
  visit(electronic: Electronic): void;
  visit(product: Product): void {
    if (product instanceof Book) {
      this.calculateBooksTotalPrice(product);
    } else if (product instanceof Fruit) {
      this.calculateFruitsTotalPrice(product);
    } else if (product instanceof Electronic) {
      this.calculateElectronicsTotalPrice(product);
    }
  }

  private calculateBooksTotalPrice(book: Book) {
    this._totalPrice.books.names.push(book.name);
    this._totalPrice.books.total += book.price;
  }

  private calculateFruitsTotalPrice(fruit: Fruit) {
    this._totalPrice.fruits.names.push(fruit.name);
    this._totalPrice.fruits.total += fruit.price;
  }

  private calculateElectronicsTotalPrice(electronic: Electronic) {
    this._totalPrice.electronics.names.push(electronic.name);
    this._totalPrice.electronics.total += electronic.price;
  }
}

class InventoryReportVisitor implements ProductVisitor {
  private _report: string = "";

  get report() {
    return this._report;
  }

  visit(book: Book): void;
  visit(fruit: Fruit): void;
  visit(electronic: Electronic): void;
  visit(product: Product): void {
    if (product instanceof Book) {
      this._report += `Book: ${product.name}, Price: ${product.price}, ISBN: ${product.isbn}\n`;
    } else if (product instanceof Fruit) {
      this._report += `Fruit: ${product.name}, Price: ${product.price}, Weight: ${product.weight}kg\n`;
    } else if (product instanceof Electronic) {
      this._report += `Electronic: ${product.name}, Price: ${product.price}, Model: ${product.model}\n`;
    }
  }
}

type ReportDetail = {
  names: string[];
  total: number;
};

class ReportVisitor implements ProductVisitor {
  report: {
    books: ReportDetail;
    fruits: ReportDetail;
    electronics: ReportDetail;
  } = {
    books: { names: [], total: 0 },
    fruits: { names: [], total: 0 },
    electronics: { names: [], total: 0 },
  };

  visit(book: Book): void;
  visit(fruit: Fruit): void;
  visit(electronic: Electronic): void;
  visit(product: Product): void {
    if (product instanceof Book) {
      this.generateBooksReport(product);
    } else if (product instanceof Fruit) {
      this.generateFruitsReport(product);
    } else if (product instanceof Electronic) {
      this.generateElectronicsReport(product);
    }
  }

  private generateBooksReport(book: Book) {
    this.report.books.names.push(book.name);
    this.report.books.total += book.price;
  }

  private generateFruitsReport(fruit: Fruit) {
    this.report.fruits.names.push(fruit.name);
    this.report.fruits.total += fruit.price;
  }

  private generateElectronicsReport(electronic: Electronic) {
    this.report.electronics.names.push(electronic.name);
    this.report.electronics.total += electronic.price;
  }
}

// Client
class VisitorClient {
  static main() {
    const items: Product[] = [
      new Book("Book1", 20, "ISBN12345"),
      new Fruit("Apple", 2, 5),
      new Electronic("Airpod", 200, "Airpod 3"),
    ];

    const totalPriceCalculatorVisitor = new TotalPriceCalculatorVisitor();

    const totalDiscountedPriceCalculatorVisitor =
      new TotalDiscountedPriceCalculatorVisitor(0.9, 0.95, 0.85);

    const taxCalculatorVisitor = new TaxCalculatorVisitor(0.1, 0.05, 0.2);

    const inventoryReportVisitor = new InventoryReportVisitor();

    const reportVisitor = new ReportVisitor();

    for (const item of items) {
      item.accept(totalPriceCalculatorVisitor);
      item.accept(totalDiscountedPriceCalculatorVisitor);
      item.accept(taxCalculatorVisitor);
      item.accept(inventoryReportVisitor);
      item.accept(reportVisitor);
    }

    console.log(`Total Price: ${JSON.stringify(totalPriceCalculatorVisitor.totalPrice)}`);

    console.log(
      `Total Discounted Price: ${JSON.stringify(totalDiscountedPriceCalculatorVisitor.productDiscount)}`
    );

    console.log(`Total Tax: ${JSON.stringify(taxCalculatorVisitor.totalTax)}`);

    console.log(`Inventory: ${JSON.stringify(inventoryReportVisitor.report)}`);

    console.log(`Report: ${JSON.stringify(reportVisitor.report)}`);
  }
}

VisitorClient.main();

export {};
