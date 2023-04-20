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

  pressOnButton() {
    this.switchOnCommand.execute();
  }

  pressOffButton() {
    this.switchOffCommand.execute();
  }
}

// Sender/Invoker
class MobileApp {
  private readonly switchOnCommand: Command;
  private readonly switchOffCommand: Command;

  constructor(switchOnCommand: Command, switchOffCommand: Command) {
    this.switchOnCommand = switchOnCommand;
    this.switchOffCommand = switchOffCommand;
  }

  tapOnButton() {
    this.switchOnCommand.execute();
  }

  tapOffButton() {
    this.switchOffCommand.execute();
  }
}

// Sender/Invoker
class VoiceAssistant {
  private readonly switchOnCommand: Command;
  private readonly switchOffCommand: Command;

  constructor(switchOnCommand: Command, switchOffCommand: Command) {
    this.switchOnCommand = switchOnCommand;
    this.switchOffCommand = switchOffCommand;
  }

  sayTurnOn() {
    this.switchOnCommand.execute();
  }

  sayTurnOff() {
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

    const television: Switchable = new Television();

    const radio: Switchable = new Radio();

    CommandClient.test(light);

    CommandClient.test(television);

    CommandClient.test(radio);
  }

  static test(switchable: Switchable) {
    // Commands
    const switchOnCommand: Command = new SwitchOnCommand(switchable);

    const switchOffCommand: Command = new SwitchOffCommand(switchable);

    // Senders
    const switchBox = new SwitchBox(switchOnCommand, switchOffCommand);

    const remoteControl = new RemoteControl(switchOnCommand, switchOffCommand);

    const mobileApp = new MobileApp(switchOnCommand, switchOffCommand);

    const voiceAssistance = new VoiceAssistant(
      switchOnCommand,
      switchOffCommand
    );

    switchBox.flipUp();

    switchBox.flipDown();

    remoteControl.pressOnButton();

    remoteControl.pressOffButton();

    mobileApp.tapOnButton();

    mobileApp.tapOffButton();

    voiceAssistance.sayTurnOn();

    voiceAssistance.sayTurnOff();
  }
}

CommandClient.main();

export {};
