interface Command {
  execute(): void;
}

// Receiver
class Light {
  turnOn() {
    console.log("The light is on");
  }

  turnOff() {
    console.log("The light is off");
  }
}

// Sender/Invoker
class Switch {
  private readonly flipUpCommand: Command;
  private readonly flipDownCommand: Command;

  constructor(flipUpCommand: Command, flipDownCommand: Command) {
    this.flipUpCommand = flipUpCommand;
    this.flipDownCommand = flipDownCommand;
  }

  turnOn() {
    this.flipUpCommand.execute();
  }

  turnOff() {
    this.flipDownCommand.execute();
  }
}

// Command
class FlipUpCommand implements Command {
  private readonly light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOn();
  }
}

// Command
class FlipDownCommand implements Command {
  private readonly light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOff();
  }
}

// Client
class CommandClient {
  static main() {
    const light = new Light();

    const flipUpCommand = new FlipUpCommand(light);

    const flipDownCommand = new FlipDownCommand(light);

    const switchBox = new Switch(flipUpCommand, flipDownCommand);

    switchBox.turnOn();

    switchBox.turnOff();
  }
}

export {};
