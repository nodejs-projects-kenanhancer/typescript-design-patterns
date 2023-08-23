import { ProductVisitor } from "./ProductVisitor";

export interface Product {
  name: string;
  price: number;
  accept(visitor: ProductVisitor): void;
}
