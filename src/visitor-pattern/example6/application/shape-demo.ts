import {
  AreaCalculatorVisitor,
  AreaComparerVisitor,
  AreaComparison,
  CentroidCalculatorVisitor,
  Circle,
  DiagonalDiameterCalculatorVisitor,
  PerimeterCalculatorVisitor,
  Rectangle,
  RotationCalculatorVisitor,
  ScalingCalculatorVisitor,
  ShapeDuplicatorVisitor,
  Square,
  Triangle,
  VisitableShape,
} from "../domain/shape";

export class ShapeDemo {
  static main() {
    const circle: VisitableShape = new Circle(5);
    const rectangle: VisitableShape = new Rectangle(4, 6);
    const square: VisitableShape = new Square(4);
    const triangle: VisitableShape = new Triangle(3, 4);

    const shapes: VisitableShape[] = [circle, rectangle, square, triangle];

    this.printShapeDetails(shapes);
  }

  static printShapeDetails(shapes: VisitableShape[]) {
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
      console.log(
        `Area comparison result: ${AreaComparison[comparisonResult]}`
      );
    }
  }
}
