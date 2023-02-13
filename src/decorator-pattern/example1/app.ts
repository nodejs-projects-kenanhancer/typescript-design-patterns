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
  constructor(private readonly decoratedWindow: IWindow) {}

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
  constructor(decoratedWindow: IWindow) {
    super(decoratedWindow);
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
