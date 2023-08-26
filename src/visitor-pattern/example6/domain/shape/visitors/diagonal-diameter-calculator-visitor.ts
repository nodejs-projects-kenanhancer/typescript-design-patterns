import { ShapeVisitor } from "../contracts";
import { Circle, Rectangle, Square, Triangle } from "../entities";

export class DiagonalDiameterCalculatorVisitor implements ShapeVisitor<number> {
  visit(circle: Circle): number;
  visit(rectangle: Rectangle): number;
  visit(square: Square): number;
  visit(square: Triangle): number;
  visit(shape: Circle | Rectangle | Square | Triangle): number {
    if (shape instanceof Circle) {
      return this.calculateCircleDiagonalDiameter(shape);
    } else if (shape instanceof Rectangle) {
      return this.calculateRectangleDiagonalDiameter(shape);
    } else if (shape instanceof Triangle) {
      return this.calculateTriangleDiagonalDiameter(shape);
    }
  }

  private calculateCircleDiagonalDiameter(circle: Circle): number {
    return 2 * circle.radius;
  }

  private calculateRectangleDiagonalDiameter(rectangle: Rectangle): number {
    return Math.sqrt(
      rectangle.width * rectangle.width + rectangle.height * rectangle.height
    );
  }

  private calculateTriangleDiagonalDiameter(triangle: Triangle): number {
    // For a right triangle, the hypotenuse is the longest side.
    return Math.sqrt(triangle.base ** 2 + triangle.height ** 2);
  }
}
