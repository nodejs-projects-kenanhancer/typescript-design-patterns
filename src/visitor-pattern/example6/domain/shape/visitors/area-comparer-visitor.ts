import { ShapeVisitor, VisitableShape } from "../contracts";
import { Circle, Rectangle, Square, Triangle } from "../entities";
import { AreaComparison } from "../enums";
import { AreaCalculatorVisitor } from "./area-calculator-visitor";

export class AreaComparerVisitor implements ShapeVisitor<AreaComparison> {
  private areaCalculator = new AreaCalculatorVisitor();

  constructor(private secondShape: VisitableShape) {}

  visit(circle: Circle): AreaComparison;
  visit(rectangle: Rectangle): AreaComparison;
  visit(square: Square): AreaComparison;
  visit(square: Triangle): AreaComparison;
  visit(shape: Circle | Rectangle | Square | Triangle): AreaComparison {
    if (shape instanceof Circle) {
      return this.compareCircle(shape);
    } else if (shape instanceof Rectangle) {
      this.compareRectangle(shape);
    } else if (shape instanceof Triangle) {
      this.compareTriangle(shape);
    }
  }

  private compareCircle(circle: Circle): AreaComparison {
    return this.compareAreas(circle, this.secondShape);
  }

  private compareRectangle(rectangle: Rectangle): AreaComparison {
    return this.compareAreas(rectangle, this.secondShape);
  }

  private compareTriangle(triangle: Triangle): AreaComparison {
    return this.compareAreas(triangle, this.secondShape);
  }

  private compareAreas(
    firstShape: VisitableShape,
    secondShape: VisitableShape
  ): AreaComparison {
    const firstShapeArea = firstShape.accept(this.areaCalculator);
    const secondShapeArea = secondShape.accept(this.areaCalculator);

    if (firstShapeArea > secondShapeArea) {
      return AreaComparison.Larger;
    } else if (firstShapeArea < secondShapeArea) {
      return AreaComparison.Smaller;
    } else {
      return AreaComparison.Equal;
    }
  }
}
