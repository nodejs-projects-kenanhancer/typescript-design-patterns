import { Book, Electronic, Fruit } from "../../entities";
import { Product, ProductTotalPrice, ProductVisitor } from "../contracts";

export class TotalPriceCalculatorVisitor implements ProductVisitor {
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
