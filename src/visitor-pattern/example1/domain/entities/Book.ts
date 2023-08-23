import { Product, ProductVisitor } from "../shared/contracts";

export class Book implements Product {
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
