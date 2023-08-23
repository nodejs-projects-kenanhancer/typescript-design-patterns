import { Book, Electronic, Fruit } from "../../entities";
import {
    Product,
    ProductTotalDiscountedPrice,
    ProductVisitor,
} from "../contracts";

export class TotalDiscountedPriceCalculatorVisitor implements ProductVisitor {
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
