import { ShapeVisitor } from "../contracts";
import { Circle, Rectangle, Square, Triangle } from "../entities";

export class ScalingCalculatorVisitor implements ShapeVisitor<void> {
  private scaleFactor: number;

  constructor(scaleFactor: number) {
    this.scaleFactor = scaleFactor;
  }

  visit(circle: Circle): void;
  visit(rectangle: Rectangle): void;
  visit(square: Square): void;
  visit(square: Triangle): void;
  visit(shape: Circle | Rectangle | Square | Triangle): void {
    if (shape instanceof Circle) {
      this.calculateCircleScaling(shape);
    } else if (shape instanceof Rectangle) {
      this.calculateRectangleScaling(shape);
    } else if (shape instanceof Triangle) {
      this.calculateTriangleScaling(shape);
    }
  }

  private calculateCircleScaling(circle: Circle): void {
    circle.radius *= this.scaleFactor;
  }

  private calculateRectangleScaling(rectangle: Rectangle): void {
    rectangle.width *= this.scaleFactor;
    rectangle.height *= this.scaleFactor;
  }

  private calculateTriangleScaling(triangle: Triangle): void {
    const scaledBase = triangle.base * this.scaleFactor;
    const scaledHeight = triangle.height * this.scaleFactor;

    triangle.base = scaledBase;
    triangle.height = scaledHeight;
  }
}
