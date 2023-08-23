import { Book, Electronic, Fruit } from "../../entities";
import { Product, ProductVisitor, ReportDetail } from "../contracts";

export class ReportVisitor implements ProductVisitor {
  report: {
    books: ReportDetail;
    fruits: ReportDetail;
    electronics: ReportDetail;
  } = {
    books: { names: [], total: 0 },
    fruits: { names: [], total: 0 },
    electronics: { names: [], total: 0 },
  };

  visit(book: Book): void;
  visit(fruit: Fruit): void;
  visit(electronic: Electronic): void;
  visit(product: Product): void {
    if (product instanceof Book) {
      this.generateBooksReport(product);
    } else if (product instanceof Fruit) {
      this.generateFruitsReport(product);
    } else if (product instanceof Electronic) {
      this.generateElectronicsReport(product);
    }
  }

  private generateBooksReport(book: Book) {
    this.report.books.names.push(book.name);
    this.report.books.total += book.price;
  }

  private generateFruitsReport(fruit: Fruit) {
    this.report.fruits.names.push(fruit.name);
    this.report.fruits.total += fruit.price;
  }

  private generateElectronicsReport(electronic: Electronic) {
    this.report.electronics.names.push(electronic.name);
    this.report.electronics.total += electronic.price;
  }
}
