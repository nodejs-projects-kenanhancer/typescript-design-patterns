import { ProductVisitor } from "./productVisitor";

export interface Product {
  name: string;
  price: number;
  accept(visitor: ProductVisitor): void;
}
