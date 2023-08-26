import { ShapeVisitor, VisitableShape } from "../contracts";

export class Triangle implements VisitableShape {
  constructor(public base: number, public height: number) {}

  accept<T>(visitor: ShapeVisitor<T>): T {
    return visitor.visit(this);
  }
}
