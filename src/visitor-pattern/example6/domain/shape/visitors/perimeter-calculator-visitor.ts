import { ShapeVisitor } from "../contracts";
import { Circle, Rectangle, Square, Triangle } from "../entities";

export class PerimeterCalculatorVisitor implements ShapeVisitor<number> {
  visit(circle: Circle): number;
  visit(rectangle: Rectangle): number;
  visit(square: Square): number;
  visit(square: Triangle): number;
  visit(shape: Circle | Rectangle | Square | Triangle): number {
    if (shape instanceof Circle) {
      return this.calculateCirclePerimeter(shape);
    } else if (shape instanceof Rectangle) {
      return this.calculateRectanglePerimeter(shape);
    } else if (shape instanceof Triangle) {
      return this.calculateTrianglePerimeter(shape);
    }
  }

  private calculateCirclePerimeter(circle: Circle) {
    return 2 * Math.PI * circle.radius;
  }

  private calculateRectanglePerimeter(rectangle: Rectangle) {
    return 2 * (rectangle.width + rectangle.height);
  }

  private calculateTrianglePerimeter(triangle: Triangle) {
    // For a right triangle: perimeter = base + height + hypotenuse
    const hypotenuse = Math.sqrt(triangle.base ** 2 + triangle.height ** 2);
    return triangle.base + triangle.height + hypotenuse;
  }
}
