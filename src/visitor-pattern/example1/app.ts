import { Book, Electronic, Fruit } from "./domain/entities";
import { Product } from "./domain/shared/contracts";
import {
    InventoryReportVisitor,
    ReportVisitor,
    TaxCalculatorVisitor,
    TotalDiscountedPriceCalculatorVisitor,
    TotalPriceCalculatorVisitor,
} from "./domain/shared/visitors";

// Client
class VisitorClient {
  static main() {
    const items: Product[] = [
      new Book("Book1", 20, "ISBN12345"),
      new Fruit("Apple", 2, 5),
      new Electronic("Airpod", 200, "Airpod 3"),
    ];

    const totalPriceCalculatorVisitor = new TotalPriceCalculatorVisitor();

    const totalDiscountedPriceCalculatorVisitor =
      new TotalDiscountedPriceCalculatorVisitor(0.9, 0.95, 0.85);

    const taxCalculatorVisitor = new TaxCalculatorVisitor(0.1, 0.05, 0.2);

    const inventoryReportVisitor = new InventoryReportVisitor();

    const reportVisitor = new ReportVisitor();

    for (const item of items) {
      item.accept(totalPriceCalculatorVisitor);
      item.accept(totalDiscountedPriceCalculatorVisitor);
      item.accept(taxCalculatorVisitor);
      item.accept(inventoryReportVisitor);
      item.accept(reportVisitor);
    }

    console.log(
      `Total Price: ${JSON.stringify(totalPriceCalculatorVisitor.totalPrice)}`
    );

    console.log(
      `Total Discounted Price: ${JSON.stringify(
        totalDiscountedPriceCalculatorVisitor.productDiscount
      )}`
    );

    console.log(`Total Tax: ${JSON.stringify(taxCalculatorVisitor.totalTax)}`);

    console.log(`Inventory: ${JSON.stringify(inventoryReportVisitor.report)}`);

    console.log(`Report: ${JSON.stringify(reportVisitor.report)}`);
  }
}

VisitorClient.main();

export { };

