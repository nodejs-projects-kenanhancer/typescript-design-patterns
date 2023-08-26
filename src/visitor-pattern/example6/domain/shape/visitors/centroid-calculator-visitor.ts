import { ShapeVisitor } from "../contracts";
import { Circle, Rectangle, Square, Triangle } from "../entities";
import { Point } from "../value-objects";

export class CentroidCalculatorVisitor implements ShapeVisitor<Point> {
  visit(circle: Circle): Point;
  visit(rectangle: Rectangle): Point;
  visit(square: Square): Point;
  visit(square: Triangle): Point;
  visit(shape: Circle | Rectangle | Square | Triangle): Point {
    if (shape instanceof Circle) {
      return this.calculateCircleCenter(shape);
    } else if (shape instanceof Rectangle) {
      return this.calculateRectangleCenter(shape);
    } else if (shape instanceof Triangle) {
      return this.calculateTriangleCenter(shape);
    }
  }

  private calculateCircleCenter(circle: Circle): Point {
    return new Point(0, 0); // Assuming the circle is centered at the origin
  }

  private calculateRectangleCenter(rectangle: Rectangle): Point {
    return new Point(rectangle.width / 2, rectangle.height / 2); // Centroid is at half its width and half its height
  }

  private calculateTriangleCenter(triangle: Triangle): Point {
    // For a right triangle with base along the x-axis and height along y-axis:
    return { x: triangle.base / 3, y: triangle.height / 3 };
  }
}
