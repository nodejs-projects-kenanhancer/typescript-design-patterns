import { ShapeVisitor } from "../contracts";
import { Circle, Rectangle, Square, Triangle } from "../entities";

export class AreaCalculatorVisitor implements ShapeVisitor<number> {
  visit(circle: Circle): number;
  visit(rectangle: Rectangle): number;
  visit(square: Square): number;
  visit(square: Triangle): number;
  visit(shape: Circle | Rectangle | Square | Triangle): number {
    if (shape instanceof Circle) {
      return this.calculateCircleArea(shape);
    } else if (shape instanceof Rectangle) {
      return this.calculateRectangleArea(shape);
    } else if (shape instanceof Triangle) {
      return this.calculateTriangleArea(shape);
    }
  }

  private calculateCircleArea(circle: Circle) {
    return Math.PI * Math.pow(circle.radius, 2);
  }

  private calculateRectangleArea(rectangle: Rectangle) {
    return rectangle.width * rectangle.height;
  }

  private calculateTriangleArea(triangle: Triangle) {
    return 0.5 * triangle.base * triangle.height;
  }
}
