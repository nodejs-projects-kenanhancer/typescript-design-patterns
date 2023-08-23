import { Product, ProductVisitor } from "../shared/contracts";

export class Fruit implements Product {
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
