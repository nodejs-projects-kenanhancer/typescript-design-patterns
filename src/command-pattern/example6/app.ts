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
  switchOn() {
    console.log("The light is on");
  }

  switchOff() {
    console.log("The light is off");
  }
}

// Receiver
class Television implements Switchable {
  switchOn(): void {
    console.log("The television is on");
  }

  switchOff(): void {
    console.log("The television is off");
  }
}

// Receiver
class Radio implements Switchable {
  switchOn(): void {
    console.log("The radio is on");
  }

  switchOff(): void {
    console.log("The radio is off");
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

  flipUp() {
    this.switchOnCommand.execute();
  }

  flipDown() {
    this.switchOffCommand.execute();
  }
}

// Sender/Invoker
class RemoteControl {
  private readonly switchOnCommand: Command;
  private readonly switchOffCommand: Command;

  constructor(switchOnCommand: Command, switchOffCommand: Command) {
    this.switchOnCommand = switchOnCommand;
    this.switchOffCommand = switchOffCommand;
  }

  pressOn() {
    this.switchOnCommand.execute();
  }

  pressOff() {
    this.switchOffCommand.execute();
  }
}

// Command
class LightOnCommand implements Command {
  private readonly switchable: Switchable;

  constructor(switchable: Switchable) {
    this.switchable = switchable;
  }

  execute(): void {
    this.switchable.switchOn();
  }
}

// Command
class LightOffCommand implements Command {
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

    const television: Switchable = new Television();

    const radio: Switchable = new Radio();

    CommandClient.test(light);

    CommandClient.test(television);

    CommandClient.test(radio);
  }

  static test(switchable: Switchable) {
    const turnOnCommand: Command = new LightOnCommand(switchable);

    const turnOffCommand: Command = new LightOffCommand(switchable);

    const switchBox = new SwitchBox(turnOnCommand, turnOffCommand);

    const remoteControl = new RemoteControl(turnOnCommand, turnOffCommand);

    switchBox.flipUp();

    switchBox.flipDown();

    remoteControl.pressOn();

    remoteControl.pressOff();
  }
}

CommandClient.main();

export {};
