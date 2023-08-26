import { ShapeVisitor } from ".";

export interface VisitableShape {
  accept<T>(visitor: ShapeVisitor<T>): T;
}
