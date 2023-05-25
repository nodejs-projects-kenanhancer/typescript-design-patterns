import type { DTOValidatorType, ShapeType, ToDTO } from "./type";
import { DTOValidator } from "./validator";

export class Shape {
  readonly type: ShapeType;
  readonly area: number;
  readonly perimeter: number;
  private static validator: DTOValidatorType<Shape> =
    DTOValidator.createDefaultInstance();

  private constructor(type: ShapeType, area: number, perimeter: number) {
    this.type = type;
    this.area = area;
    this.perimeter = perimeter;
  }

  private static validate(
    dto: ToDTO<Shape>,
    validator?: DTOValidatorType<Shape>
  ) {
    const _validator = validator || Shape.validator;

    if (_validator) {
      _validator.validate(dto);
    }
  }

  static createCircle(
    radius: number,
    validator?: DTOValidatorType<Shape>
  ): Shape {
    const area = Math.PI * radius * radius;
    const perimeter = 2 * Math.PI * radius;

    const shape = new Shape("Circle", area, perimeter);

    Shape.validate(shape, validator);

    return shape;
  }

  static createRectangle(
    length: number,
    width: number,
    validator?: DTOValidatorType<Shape>
  ) {
    const area = length * width;
    const perimeter = 2 * (length + width);

    const shape = new Shape("Rectangle", area, perimeter);

    Shape.validate(shape, validator);

    return shape;
  }

  static createTriangle(
    side1: number,
    side2: number,
    side3: number,
    validator?: DTOValidatorType<Shape>
  ) {
    // Assuming the sides form a valid triangle
    const perimeter = side1 + side2 + side3;
    // Using Heron's formula to calculate the area
    const s = perimeter / 2;
    const area = Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));

    const shape = new Shape("Triangle", area, perimeter);

    Shape.validate(shape, validator);

    return shape;
  }

  static createSquare(side: number, validator?: DTOValidatorType<Shape>) {
    const area = side * side;
    const perimeter = 4 * side;

    const shape = new Shape("Square", area, perimeter);

    Shape.validate(shape, validator);

    return shape;
  }

  static createEllipse(
    semiMajorAxis: number,
    semiMinorAxis: number,
    validator?: DTOValidatorType<Shape>
  ) {
    const area = Math.PI * semiMajorAxis * semiMinorAxis;
    const perimeter =
      2 *
      Math.PI *
      Math.sqrt(semiMajorAxis * semiMajorAxis + semiMinorAxis * semiMinorAxis);

    const shape = new Shape("Ellipse", area, perimeter);

    Shape.validate(shape, validator);

    return shape;
  }
}
