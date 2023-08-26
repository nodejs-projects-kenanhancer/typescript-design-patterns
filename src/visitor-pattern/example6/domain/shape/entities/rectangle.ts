import { ShapeVisitor, VisitableShape } from "../contracts";

export class Rectangle implements VisitableShape {
  constructor(public width: number, public height: number) {}

  accept<T>(visitor: ShapeVisitor<T>): T {
    return visitor.visit(this);
  }
}
