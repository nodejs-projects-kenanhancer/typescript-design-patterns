import { ShapeVisitor } from "../contracts";
import { Circle, Rectangle, Square, Triangle } from "../entities";
import { Point } from "../value-objects";

export class RotationCalculatorVisitor implements ShapeVisitor<void> {
  private rotationAngle: number;

  constructor(rotationAngle: number) {
    this.rotationAngle = rotationAngle; // angle in radians
  }

  visit(circle: Circle): void;
  visit(rectangle: Rectangle): void;
  visit(square: Square): void;
  visit(square: Triangle): void;
  visit(shape: Circle | Rectangle | Square | Triangle): void {
    if (shape instanceof Circle) {
      this.calculateCircleRotation(shape);
    } else if (shape instanceof Rectangle) {
      this.calculateRectangleRotation(shape);
    } else if (shape instanceof Triangle) {
      this.calculateTriangleRotation(shape);
    }
  }

  private calculateCircleRotation(circle: Circle): void {
    // For the Circle, rotation doesn't affect its dimensions.
    // No changes as rotating a circle has no visual effect on its properties.
  }

  private calculateRectangleRotation(rectangle: Rectangle): void {
    // For the Rectangle, we'll swap its width and height.
    const temp = rectangle.width;
    rectangle.width = rectangle.height;
    rectangle.height = temp;

    // For simplicity, we'll rotate the bottom-left corner of the rectangle
    const rotatedVertex = this.rotatePoint({ x: rectangle.width, y: 0 });
    const newWidth = rotatedVertex.x;
    const newHeight = rotatedVertex.y;

    rectangle.width = newWidth;
    rectangle.height = newHeight;
  }

  private calculateTriangleRotation(triangle: Triangle): void {
    // For simplicity, we'll rotate the right-angle vertex of the triangle
    const rotatedVertex = this.rotatePoint({
      x: triangle.base,
      y: triangle.height,
    });
    const newBase = rotatedVertex.x;
    const newHeight = rotatedVertex.y;

    triangle.base = newBase;
    triangle.height = newHeight;
  }

  private rotatePoint(point: Point): Point {
    return {
      x:
        point.x * Math.cos(this.rotationAngle) -
        point.y * Math.sin(this.rotationAngle),
      y:
        point.x * Math.sin(this.rotationAngle) +
        point.y * Math.cos(this.rotationAngle),
    };
  }
}
