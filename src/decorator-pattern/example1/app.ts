interface IWindow {
  draw(): void;
  getDescription(): string;
}

class SimpleWindow implements IWindow {
  draw(): void {
    console.log("Draw window");
  }

  getDescription(): string {
    return "simple window";
  }
}

abstract class WindowDecorator implements IWindow {
  constructor(protected readonly decoratedWindow: IWindow) {}

  draw(): void {
    this.decoratedWindow.draw();
  }

  getDescription(): string {
    return this.decoratedWindow.getDescription();
  }
}

class VerticalScrollBarDecorator extends WindowDecorator {
  constructor(decoratedWindow: IWindow) {
    super(decoratedWindow);
  }

  private drawVerticalScrollBar() {
    console.log("Draw the vertical scrollbar");
  }

  draw(): void {
    super.draw();
    this.drawVerticalScrollBar();
  }

  getDescription(): string {
    return `${super.getDescription()}, including vertical scrollbars`;
  }
}

class HorizontalScrollBarDecorator extends WindowDecorator {
  constructor(decoratedWindow: IWindow) {
    super(decoratedWindow);
  }

  private drawVerticalScrollBar() {
    console.log("Draw the horizontal scrollbar");
  }

  draw(): void {
    super.draw();
    this.drawVerticalScrollBar();
  }

  getDescription(): string {
    return `${super.getDescription}, including horizontal scrollbars`;
  }
}

(function () {
  const decoratedWindow: IWindow = new HorizontalScrollBarDecorator(
    new VerticalScrollBarDecorator(new SimpleWindow())
  );

  console.log(decoratedWindow.getDescription());
})();
