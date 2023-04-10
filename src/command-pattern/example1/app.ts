interface Command {
  execute(): void;
}

// Receiver Contract
interface Switchable {
  switchOn(): void;
  switchOff(): void;
}

// Receiver
class Light implements Switchable {
  private static LIGHT_ON = "The light is on!";
  private static LIGHT_OFF = "The light is off!";
  private static LIGHT_ALREADY_ON = "The light is already turned on!";
  private static LIGHT_ALREADY_OFF = "The light is already turned off!";

  private lightState: boolean = false;

  private setState(state: boolean, warning: string, notification: string) {
    if (this.lightState === state) {
      console.warn(warning);
    } else {
      this.lightState = state;
      console.log(notification);
    }
  }

  switchOn(): void {
    this.setState(true, Light.LIGHT_ALREADY_ON, Light.LIGHT_ON);
  }

  switchOff(): void {
    this.setState(false, Light.LIGHT_ALREADY_OFF, Light.LIGHT_OFF);
  }
}

// Sender/Invoker
class SwitchBox {
  private readonly switchOnCommand: Command;
  private readonly switchOffCommand: Command;

  constructor(switchOnCommand: Command, switchOffCommand: Command) {
    this.switchOnCommand = switchOnCommand;
    this.switchOffCommand = switchOffCommand;
  }

  open() {
    this.switchOnCommand.execute();
  }

  close() {
    this.switchOffCommand.execute();
  }
}

// Command
class SwitchOnCommand implements Command {
  private readonly switchable: Switchable;

  constructor(switchable: Switchable) {
    this.switchable = switchable;
  }

  execute(): void {
    this.switchable.switchOn();
  }
}

// Command
class SwitchOffCommand implements Command {
  private readonly switchable: Switchable;

  constructor(switchable: Switchable) {
    this.switchable = switchable;
  }

  execute(): void {
    this.switchable.switchOff();
  }
}

// Client
class CommandClient {
  static main() {
    const light: Switchable = new Light();

    const switchOnCommand: Command = new SwitchOnCommand(light);

    const switchOffCommand: Command = new SwitchOffCommand(light);

    const switchBox = new SwitchBox(switchOnCommand, switchOffCommand);

    switchBox.open();

    switchBox.open();

    switchBox.close();

    switchBox.close();

    switchBox.open();

    switchBox.close();
  }
}

CommandClient.main();

export {};
