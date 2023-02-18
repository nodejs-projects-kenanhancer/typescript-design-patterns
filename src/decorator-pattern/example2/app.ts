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

enum Color {
  RED = "RED",
  YELLOW = "YELLOW",
  GREEN = "GREEN",
  BLUE = "BLUE",
}

class BorderDecorator extends ShapeDecorator {
  constructor(public readonly color: Color, decoratedShape: Shape) {
    super(decoratedShape);
  }

  private setBorder() {
    console.log(`Border Color: ${this.color}`);
  }

  draw(): void {
    this.decoratedShape.draw();
    this.setBorder();
  }
}

class BackgroudDecorator extends ShapeDecorator {
  constructor(public readonly color: Color, decoratedShape: Shape) {
    super(decoratedShape);
  }

  private setBackground() {
    console.log(`Background Color: ${this.color}`);
  }

  draw(): void {
    this.decoratedShape.draw();
    this.setBackground();
  }
}

(function () {
  const circle: Shape = new Circle();

  const greenBackgroundRectangle: Shape = new BackgroudDecorator(Color.GREEN,new Rectangle());
  
  const redBackgroundYellowBorderCircle: Shape = new BackgroudDecorator(Color.RED, new BorderDecorator(Color.YELLOW, new Circle()));



  console.log("Circle with normal border and background color");

  circle.draw();


  console.log("Rectangle with normal border and green background color");

  greenBackgroundRectangle.draw();


  console.log("Circle with yellow border and red background color");

  redBackgroundYellowBorderCircle.draw();

})();
