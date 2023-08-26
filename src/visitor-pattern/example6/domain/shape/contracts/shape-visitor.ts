import { Circle, Rectangle, Square, Triangle } from "../entities";

export interface ShapeVisitor<T> {
  visit(circle: Circle): T;
  visit(rectangle: Rectangle): T;
  visit(square: Square): T;
  visit(triangle: Triangle): T;
}
