import { ShapeType } from "./type";

export class Shape {
  readonly type: ShapeType;
  readonly area: number;
  readonly perimeter: number;

  private constructor(type: ShapeType, area: number, perimeter: number) {
    this.type = type;
    this.area = area;
    this.perimeter = perimeter;
  }

  static createCircle(radius: number): Shape {
    const area = Math.PI * radius * radius;
    const perimeter = 2 * Math.PI * radius;

    return new Shape("Circle", area, perimeter);
  }

  static createRectangle(length: number, width: number) {
    const area = length * width;
    const perimeter = 2 * (length + width);

    return new Shape("Rectangle", area, perimeter);
  }

  static createTriangle(side1: number, side2: number, side3: number) {
    // Assuming the sides form a valid triangle
    const perimeter = side1 + side2 + side3;
    // Using Heron's formula to calculate the area
    const s = perimeter / 2;
    const area = Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));

    return new Shape("Triangle", area, perimeter);
  }

  static createSquare(side: number) {
    const area = side * side;
    const perimeter = 4 * side;

    return new Shape("Square", area, perimeter);
  }

  static createEllipse(semiMajorAxis: number, semiMinorAxis: number) {
    const area = Math.PI * semiMajorAxis * semiMinorAxis;
    const perimeter =
      2 *
      Math.PI *
      Math.sqrt(semiMajorAxis * semiMajorAxis + semiMinorAxis * semiMinorAxis);

    return new Shape("Ellipse", area, perimeter);
  }
}
