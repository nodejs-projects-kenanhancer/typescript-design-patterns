interface Command {
  execute(): number;
}

// Receiver
class Math {
  add(a: number, b: number) {
    return a + b;
  }

  subtract(a: number, b: number) {
    return a - b;
  }

  multiply(a: number, b: number) {
    return a * b;
  }

  divide(a: number, b: number) {
    return a / b;
  }
}

// Sender/Invoker
class Calculator {
  private readonly commands: Command[] = [];

  addCommand(command: Command) {
    this.commands.push(command);
  }

  sum() {
    let sum: number = 0;

    for (const command of this.commands) {
      sum += command.execute();
    }

    return sum;
  }
}

// Command
class AddCommand implements Command {
  private readonly math: Math;
  private readonly a: number;
  private readonly b: number;

  constructor(math: Math, a: number, b: number) {
    this.math = math;
    this.a = a;
    this.b = b;
  }

  execute(): number {
    return this.math.add(this.a, this.b);
  }
}

// Command
class SubtractCommand implements Command {
  private readonly math: Math;
  private readonly a: number;
  private readonly b: number;

  constructor(math: Math, a: number, b: number) {
    this.math = math;
    this.a = a;
    this.b = b;
  }

  execute(): number {
    return this.math.subtract(this.a, this.b);
  }
}

// Command
class MultiplyCommand implements Command {
  private readonly math: Math;
  private readonly a: number;
  private readonly b: number;

  constructor(math: Math, a: number, b: number) {
    this.math = math;
    this.a = a;
    this.b = b;
  }

  execute(): number {
    return this.math.multiply(this.a, this.b);
  }
}

// Command
class DivideCommand implements Command {
  private readonly math: Math;
  private readonly a: number;
  private readonly b: number;

  constructor(math: Math, a: number, b: number) {
    this.math = math;
    this.a = a;
    this.b = b;
  }

  execute(): number {
    return this.math.divide(this.a, this.b);
  }
}

// Client
class CommandClient {
  static main() {
    const math = new Math();

    const calculator = new Calculator();

    calculator.addCommand(new AddCommand(math, 1, 2));

    calculator.addCommand(new AddCommand(math, 3, 4));

    calculator.addCommand(new MultiplyCommand(math, 2, 2));

    calculator.addCommand(new DivideCommand(math, 9, 3));

    const sum = calculator.sum();

    console.log("Sum of calculation: " + sum);
  }
}

CommandClient.main();

export {};
