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

  calculate() {
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

class CommandClient{
    static main(){

    }
}

CommandClient.main();

export {};
