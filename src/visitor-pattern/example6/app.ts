interface VisitableShape {
  accept<T>(visitor: ShapeVisitor<T>): T;
}

interface ShapeVisitor<T> {
  visit(circle: Circle): T;
  visit(rectangle: Rectangle): T;
  visit(square: Square): T;
  visit(triangle: Triangle): T;
}

class Circle implements VisitableShape {
  constructor(public radius: number) {}

  accept<T>(visitor: ShapeVisitor<T>): T {
    return visitor.visit(this);
  }
}

class Rectangle implements VisitableShape {
  constructor(public width: number, public height: number) {}

  accept<T>(visitor: ShapeVisitor<T>): T {
    return visitor.visit(this);
  }
}

class Square extends Rectangle {
  constructor(public sideLength: number) {
    super(sideLength, sideLength);
  }
}

class Triangle implements VisitableShape {
  constructor(public base: number, public height: number) {}

  accept<T>(visitor: ShapeVisitor<T>): T {
    return visitor.visit(this);
  }
}

class AreaCalculatorVisitor implements ShapeVisitor<number> {
  visit(circle: Circle): number;
  visit(rectangle: Rectangle): number;
  visit(square: Square): number;
  visit(square: Triangle): number;
  visit(shape: Circle | Rectangle | Square | Triangle): number {
    if (shape instanceof Circle) {
      return this.calculateCircleArea(shape);
    } else if (shape instanceof Rectangle) {
      return this.calculateRectangleArea(shape);
    } else if (shape instanceof Triangle) {
      return this.calculateTriangleArea(shape);
    }
  }

  private calculateCircleArea(circle: Circle) {
    return Math.PI * Math.pow(circle.radius, 2);
  }

  private calculateRectangleArea(rectangle: Rectangle) {
    return rectangle.width * rectangle.height;
  }

  private calculateTriangleArea(triangle: Triangle) {
    return 0.5 * triangle.base * triangle.height;
  }
}

class PerimeterCalculatorVisitor implements ShapeVisitor<number> {
  visit(circle: Circle): number;
  visit(rectangle: Rectangle): number;
  visit(square: Square): number;
  visit(square: Triangle): number;
  visit(shape: Circle | Rectangle | Square | Triangle): number {
    if (shape instanceof Circle) {
      return this.calculateCirclePerimeter(shape);
    } else if (shape instanceof Rectangle) {
      return this.calculateRectanglePerimeter(shape);
    } else if (shape instanceof Triangle) {
      return this.calculateTrianglePerimeter(shape);
    }
  }

  private calculateCirclePerimeter(circle: Circle) {
    return 2 * Math.PI * circle.radius;
  }

  private calculateRectanglePerimeter(rectangle: Rectangle) {
    return 2 * (rectangle.width + rectangle.height);
  }

  private calculateTrianglePerimeter(triangle: Triangle) {
    // For a right triangle: perimeter = base + height + hypotenuse
    const hypotenuse = Math.sqrt(triangle.base ** 2 + triangle.height ** 2);
    return triangle.base + triangle.height + hypotenuse;
  }
}

class DiagonalDiameterCalculatorVisitor implements ShapeVisitor<number> {
  visit(circle: Circle): number;
  visit(rectangle: Rectangle): number;
  visit(square: Square): number;
  visit(square: Triangle): number;
  visit(shape: Circle | Rectangle | Square | Triangle): number {
    if (shape instanceof Circle) {
      return this.calculateCircleDiagonalDiameter(shape);
    } else if (shape instanceof Rectangle) {
      return this.calculateRectangleDiagonalDiameter(shape);
    } else if (shape instanceof Triangle) {
      return this.calculateTriangleDiagonalDiameter(shape);
    }
  }

  private calculateCircleDiagonalDiameter(circle: Circle): number {
    return 2 * circle.radius;
  }

  private calculateRectangleDiagonalDiameter(rectangle: Rectangle): number {
    return Math.sqrt(
      rectangle.width * rectangle.width + rectangle.height * rectangle.height
    );
  }

  private calculateTriangleDiagonalDiameter(triangle: Triangle): number {
    // For a right triangle, the hypotenuse is the longest side.
    return Math.sqrt(triangle.base ** 2 + triangle.height ** 2);
  }
}

class Point {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class CentroidCalculatorVisitor implements ShapeVisitor<Point> {
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

class ScalingCalculatorVisitor implements ShapeVisitor<void> {
  private scaleFactor: number;

  constructor(scaleFactor: number) {
    this.scaleFactor = scaleFactor;
  }

  visit(circle: Circle): void;
  visit(rectangle: Rectangle): void;
  visit(square: Square): void;
  visit(square: Triangle): void;
  visit(shape: Circle | Rectangle | Square | Triangle): void {
    if (shape instanceof Circle) {
      this.calculateCircleScaling(shape);
    } else if (shape instanceof Rectangle) {
      this.calculateRectangleScaling(shape);
    } else if (shape instanceof Triangle) {
      this.calculateTriangleScaling(shape);
    }
  }

  private calculateCircleScaling(circle: Circle): void {
    circle.radius *= this.scaleFactor;
  }

  private calculateRectangleScaling(rectangle: Rectangle): void {
    rectangle.width *= this.scaleFactor;
    rectangle.height *= this.scaleFactor;
  }

  private calculateTriangleScaling(triangle: Triangle): void {
    const scaledBase = triangle.base * this.scaleFactor;
    const scaledHeight = triangle.height * this.scaleFactor;

    triangle.base = scaledBase;
    triangle.height = scaledHeight;
  }
}

class ShapeDuplicatorVisitor implements ShapeVisitor<VisitableShape> {
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

class RotationCalculatorVisitor implements ShapeVisitor<void> {
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

enum AreaComparison {
  Larger,
  Equal,
  Smaller,
}

class AreaComparerVisitor implements ShapeVisitor<AreaComparison> {
  private areaCalculator = new AreaCalculatorVisitor();

  constructor(private secondShape: VisitableShape) {}

  visit(circle: Circle): AreaComparison;
  visit(rectangle: Rectangle): AreaComparison;
  visit(square: Square): AreaComparison;
  visit(square: Triangle): AreaComparison;
  visit(shape: Circle | Rectangle | Square | Triangle): AreaComparison {
    if (shape instanceof Circle) {
      return this.compareCircle(shape);
    } else if (shape instanceof Rectangle) {
      this.compareRectangle(shape);
    } else if (shape instanceof Triangle) {
      this.compareTriangle(shape);
    }
  }

  private compareCircle(circle: Circle): AreaComparison {
    return this.compareAreas(circle, this.secondShape);
  }

  private compareRectangle(rectangle: Rectangle): AreaComparison {
    return this.compareAreas(rectangle, this.secondShape);
  }

  private compareTriangle(triangle: Triangle): AreaComparison {
    return this.compareAreas(triangle, this.secondShape);
  }

  private compareAreas(
    firstShape: VisitableShape,
    secondShape: VisitableShape
  ): AreaComparison {
    const firstShapeArea = firstShape.accept(this.areaCalculator);
    const secondShapeArea = secondShape.accept(this.areaCalculator);

    if (firstShapeArea > secondShapeArea) {
      return AreaComparison.Larger;
    } else if (firstShapeArea < secondShapeArea) {
      return AreaComparison.Smaller;
    } else {
      return AreaComparison.Equal;
    }
  }
}

function printShapeDetails(shapes: VisitableShape[]) {
  const perimeterCalculator = new PerimeterCalculatorVisitor();
  const areaCalculator = new AreaCalculatorVisitor();
  const diagonalDiameterCalculator = new DiagonalDiameterCalculatorVisitor();
  const centroidCalculator = new CentroidCalculatorVisitor();
  const scalingCalculator = new ScalingCalculatorVisitor(2);
  const shapeDuplicator = new ShapeDuplicatorVisitor();

  const rotationAngleRadians = Math.PI / 4; // 45 degrees in radians
  const rotationCalculator = new RotationCalculatorVisitor(
    rotationAngleRadians
  );

  const circle: VisitableShape = new Circle(5);
  const areaComparer = new AreaComparerVisitor(circle);

  for (const shape of shapes) {
    const name = `${shape.constructor.name}`;

    const shapePerimeter = shape.accept(perimeterCalculator);
    const shapeArea = shape.accept(areaCalculator);
    const shapeDiagonalDiameter = shape.accept(diagonalDiameterCalculator);
    const shapeCenter = shape.accept(centroidCalculator);
    const duplicatedShape = shape.accept(shapeDuplicator);

    console.log(`Perimeter of ${name}: ${shapePerimeter}`);
    console.log(`Area of ${name}: ${shapeArea}`);
    console.log(`Diagonal Diameter of ${name}: ${shapeDiagonalDiameter}`);
    console.log(`Center of ${name}: ${shapeCenter}`);
    console.log(
      `Duplicated shape is created: ${JSON.stringify(duplicatedShape)}`
    );

    shape.accept(scalingCalculator);
    console.log(`Resized dimensions of ${name}: ${JSON.stringify(shape)}`);

    shape.accept(rotationCalculator);
    console.log(`Rotated shape: ${JSON.stringify(shape)}`);

    const comparisonResult = shape.accept(areaComparer);
    console.log(`Area comparison result: ${AreaComparison[comparisonResult]}`);
  }
}

const circle: VisitableShape = new Circle(5);
const rectangle: VisitableShape = new Rectangle(4, 6);
const square: VisitableShape = new Square(4);
const triangle: VisitableShape = new Triangle(3, 4);

const shapes: VisitableShape[] = [circle, rectangle, square, triangle];

printShapeDetails(shapes);

export {};
