import { Book, Electronic, Fruit } from "../../entities";
import { Product, ProductTax, ProductVisitor } from "../contracts";

export class TaxCalculatorVisitor implements ProductVisitor {
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
