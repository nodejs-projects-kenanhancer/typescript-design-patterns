import { Book, Fruit, Electronic } from "../../entities";

export interface ProductVisitor {
  visit(book: Book): void;
  visit(fruit: Fruit): void;
  visit(electronic: Electronic): void;
}
