interface IWindow {
  draw(): void;
  getDescription(): string;
}

class SimpleWindow implements IWindow {
  draw(): void {
    // Draw window
  }
  getDescription(): string {
    return "simple window";
  }
}

abstract class WindowDecorator implements IWindow {
  constructor(private readonly windowToBeDecorated: IWindow) {}

  draw(): void {
    this.windowToBeDecorated.draw();
  }
  getDescription(): string {
    return this.windowToBeDecorated.getDescription();
  }
}

class VerticalScrollBarDecorator extends WindowDecorator {
  constructor(windowToBeDecorated: IWindow) {
    super(windowToBeDecorated);
  }

  private drawVerticalScrollBar() {
    // Draw the vertical scrollbar
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
  constructor(windowToBeDecorated: IWindow) {
    super(windowToBeDecorated);
  }

  private drawVerticalScrollBar() {
    // Draw the horizontal scrollbar
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
