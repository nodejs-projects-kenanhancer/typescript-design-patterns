import { ShapeVisitor, VisitableShape } from "../contracts";
import { Circle, Rectangle, Square, Triangle } from "../entities";

export class ShapeDuplicatorVisitor implements ShapeVisitor<VisitableShape> {
  visit(circle: Circle): VisitableShape;
  visit(rectangle: Rectangle): VisitableShape;
  visit(square: Square): VisitableShape;
  visit(square: Triangle): VisitableShape;
  visit(shape: Circle | Rectangle | Square | Triangle): VisitableShape {
    if (shape instanceof Circle) {
      this.duplicateCircle(shape);
    } else if (shape instanceof Rectangle) {
      this.duplicateRectangle(shape);
    } else if (shape instanceof Triangle) {
      this.duplicateTriangle(shape);
    }

    return undefined;
  }

  private duplicateCircle(circle: Circle): VisitableShape {
    return new Circle(circle.radius);
  }

  private duplicateRectangle(rectangle: Rectangle): VisitableShape {
    return new Rectangle(rectangle.width, rectangle.height);
  }

  private duplicateTriangle(triangle: Triangle): VisitableShape {
    return new Triangle(triangle.base, triangle.height);
  }
}
