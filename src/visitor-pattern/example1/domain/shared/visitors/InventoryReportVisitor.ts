import { Book, Fruit, Electronic } from "../../entities";
import { ProductVisitor, Product } from "../contracts";

export class InventoryReportVisitor implements ProductVisitor {
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
