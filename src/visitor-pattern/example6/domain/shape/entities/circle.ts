import { ShapeVisitor, VisitableShape } from "../contracts";

export class Circle implements VisitableShape {
  constructor(public radius: number) {}

  accept<T>(visitor: ShapeVisitor<T>): T {
    return visitor.visit(this);
  }
}
