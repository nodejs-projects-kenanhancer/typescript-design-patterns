interface Shape {
  draw(): void;
}

class Rectangle implements Shape {
  draw(): void {
    console.log("Shape: Rectangle");
  }
}

class Circle implements Shape {
  draw(): void {
    console.log("Shape: Circle");
  }
}

abstract class ShapeDecorator implements Shape {
  constructor(protected readonly decoratedShape: Shape) {}

  draw(): void {
    this.decoratedShape.draw();
  }
}

class RedShapeDecorator extends ShapeDecorator {
  constructor(decoratedShape: Shape) {
    super(decoratedShape);
  }

  private setRedBorder(decoratedShape: Shape) {
    console.log("Border Color: Red");
  }

  draw(): void {
    this.decoratedShape.draw();
    this.setRedBorder(this.decoratedShape);
  }
}

class GreenShapeDecorator implements Shape {
  constructor(private readonly decoratedShape: Shape) {}

  private setGreenBorder(decoratedShape: Shape) {
    console.log("Border Color: Green");
  }

  draw(): void {
    this.decoratedShape.draw();
    this.setGreenBorder(this.decoratedShape);
  }
}

(function () {
  const circle: Shape = new Circle();

  const redCircle: Shape = new RedShapeDecorator(new Circle());

  const redRectangle: Shape = new RedShapeDecorator(new Rectangle());

  const greenCircle: Shape = new GreenShapeDecorator(new Circle());

  const greenRectangle: Shape = new GreenShapeDecorator(new Rectangle());

  console.log("Circle with normal border");

  circle.draw();

  console.log("Circle of red border");

  redCircle.draw();

  console.log("Rectangle of red border");

  redRectangle.draw();

  console.log("Circle of green border");

  greenCircle.draw();

  console.log("Rectangle of green border");

  greenRectangle.draw();
})();
