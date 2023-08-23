import { Product, ProductVisitor } from "../shared/contracts";

export class Electronic implements Product {
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
