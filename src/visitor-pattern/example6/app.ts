interface VisitableShape {
  accept<T>(visitor: ShapeVisitor<T>): T;
}

interface ShapeVisitor<T> {
  visit(circle: Circle): T;
  visit(rectangle: Rectangle): T;
  visit(square: Square): T;
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

class AreaCalculatorVisitor implements ShapeVisitor<number> {
  visit(circle: Circle): number;
  visit(rectangle: Rectangle): number;
  visit(square: Square): number;
  visit(shape: Circle | Rectangle | Square): number {
    if (shape instanceof Circle) {
      return this.calculateCircleArea(shape);
    } else if (shape instanceof Rectangle) {
      return this.calculateRectangleArea(shape);
    }
  }

  private calculateCircleArea(circle: Circle) {
    return Math.PI * Math.pow(circle.radius, 2);
  }

  private calculateRectangleArea(rectangle: Rectangle) {
    return rectangle.width * rectangle.height;
  }
}

class PerimeterCalculatorVisitor implements ShapeVisitor<number> {
  visit(circle: Circle): number;
  visit(rectangle: Rectangle): number;
  visit(square: Square): number;
  visit(shape: Circle | Rectangle | Square): number {
    if (shape instanceof Circle) {
      return this.calculateCirclePerimeter(shape);
    } else if (shape instanceof Rectangle) {
      return this.calculateRectanglePerimeter(shape);
    }
  }

  private calculateCirclePerimeter(circle: Circle) {
    return 2 * Math.PI * circle.radius;
  }

  private calculateRectanglePerimeter(rectangle: Rectangle) {
    return 2 * (rectangle.width + rectangle.height);
  }
}

class DiagonalDiameterCalculatorVisitor implements ShapeVisitor<number> {
  visit(circle: Circle): number;
  visit(rectangle: Rectangle): number;
  visit(square: Square): number;
  visit(shape: Circle | Rectangle | Square): number {
    if (shape instanceof Circle) {
      return this.calculateCircleDiagonalDiameter(shape);
    } else if (shape instanceof Rectangle) {
      return this.calculateRectangleDiagonalDiameter(shape);
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
  visit(shape: Circle | Rectangle | Square): Point {
    if (shape instanceof Circle) {
      return this.calculateCircleCenter(shape);
    } else if (shape instanceof Rectangle) {
      return this.calculateRectangleCenter(shape);
    }
  }

  private calculateCircleCenter(circle: Circle): Point {
    return new Point(0, 0); // Assuming the circle is centered at the origin
  }

  private calculateRectangleCenter(rectangle: Rectangle): Point {
    return new Point(rectangle.width / 2, rectangle.height / 2); // Centroid is at half its width and half its height
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
  visit(shape: Circle | Rectangle | Square): void {
    if (shape instanceof Circle) {
      this.calculateCircleScaling(shape);
    } else if (shape instanceof Rectangle) {
      this.calculateRectangleScaling(shape);
    }
  }

  private calculateCircleScaling(circle: Circle): void {
    circle.radius *= this.scaleFactor;
  }

  private calculateRectangleScaling(rectangle: Rectangle): void {
    rectangle.width *= this.scaleFactor;
    rectangle.height *= this.scaleFactor;
  }
}

class ShapeDuplicatorVisitor implements ShapeVisitor<VisitableShape> {
  visit(circle: Circle): VisitableShape;
  visit(rectangle: Rectangle): VisitableShape;
  visit(square: Square): VisitableShape;
  visit(shape: Circle | Rectangle | Square): VisitableShape {
    if (shape instanceof Circle) {
      this.duplicateCircle(shape);
    } else if (shape instanceof Rectangle) {
      this.duplicateRectangle(shape);
    }

    return undefined;
  }

  private duplicateCircle(circle: Circle): VisitableShape {
    return new Circle(circle.radius);
  }

  private duplicateRectangle(rectangle: Rectangle): VisitableShape {
    return new Rectangle(rectangle.width, rectangle.height);
  }
}

class RotationCalculatorVisitor implements ShapeVisitor<void> {
  visit(circle: Circle): void;
  visit(rectangle: Rectangle): void;
  visit(square: Square): void;
  visit(shape: Circle | Rectangle | Square): void {
    if (shape instanceof Circle) {
      this.calculateCircleRotation(shape);
    } else if (shape instanceof Rectangle) {
      this.calculateRectangleRotation(shape);
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
  }
}

class AreaComparerVisitor implements ShapeVisitor<string> {
  private areaCalculator = new AreaCalculatorVisitor();

  constructor(private otherShape: VisitableShape) {}

  visit(circle: Circle): string;
  visit(rectangle: Rectangle): string;
  visit(square: Square): string;
  visit(shape: Circle | Rectangle | Square): string {
    if (shape instanceof Circle) {
      return this.compareCircle(shape);
    } else if (shape instanceof Rectangle) {
      this.compareRectangle(shape);
    }
  }

  private compareCircle(circle: Circle): string {
    const circleArea = Math.PI * circle.radius * circle.radius;
    const otherShapeArea = this.otherShape.accept(this.areaCalculator);

    return this.compareAreas(circleArea, otherShapeArea);
  }

  private compareRectangle(rectangle: Rectangle): string {
    const rectangleArea = rectangle.width * rectangle.height;
    const otherShapeArea = this.otherShape.accept(this.areaCalculator);

    return this.compareAreas(rectangleArea, otherShapeArea);
  }

  private compareAreas(shapeArea: number, otherShapeArea: number): string {
    if (shapeArea > otherShapeArea) {
      return "The first shape is larger.";
    } else if (shapeArea < otherShapeArea) {
      return "The second shape is larger.";
    } else {
      return "Both shapes are of equal area.";
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
  const rotationCalculator = new RotationCalculatorVisitor();

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
    console.log(`Area comparison result: ${comparisonResult}`);
  }
}

const circle: VisitableShape = new Circle(5);
const rectangle: VisitableShape = new Rectangle(4, 6);
const square: VisitableShape = new Square(4);

const shapes: VisitableShape[] = [circle, rectangle, square];

printShapeDetails(shapes);

export {};
