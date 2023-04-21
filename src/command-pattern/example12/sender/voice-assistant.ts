import {
  CommandManager,
  DownCommand,
  SwitchOffCommand,
  SwitchOnCommand,
  UpCommand,
} from "../command";
import { Dimmable, Switchable } from "../receiver";

export class VoiceAssistant {
  private readonly light: Switchable & Dimmable;
  private readonly radio: Switchable & Dimmable;
  private readonly television: Switchable & Dimmable;
  private readonly commandManager: CommandManager;

  constructor(
    light: Switchable & Dimmable,
    radio: Switchable & Dimmable,
    television: Switchable & Dimmable,
    commandManager: CommandManager
  ) {
    this.light = light;
    this.radio = radio;
    this.television = television;
    this.commandManager = commandManager;
  }

  sayTurnOnTv() {
    const command = new SwitchOnCommand(this.television);

    this.commandManager.execute(command);
  }

  sayTurnOffTv() {
    const command = new SwitchOffCommand(this.television);

    this.commandManager.execute(command);
  }

  sayTurnOnRadio() {
    const command = new SwitchOnCommand(this.radio);

    this.commandManager.execute(command);
  }

  sayTurnOffRadio() {
    const command = new SwitchOffCommand(this.radio);

    this.commandManager.execute(command);
  }

  sayTurnOnLight() {
    const command = new SwitchOnCommand(this.light);

    this.commandManager.execute(command);
  }

  sayTurnOffLight() {
    const command = new SwitchOffCommand(this.light);

    this.commandManager.execute(command);
  }

  sayVolumeUpTV() {
    const command = new UpCommand(this.television);

    this.commandManager.execute(command);
  }

  sayVolumeDownTV() {
    const command = new DownCommand(this.television);

    this.commandManager.execute(command);
  }

  sayVolumeUpRadio() {
    const command = new UpCommand(this.radio);

    this.commandManager.execute(command);
  }

  sayVolumeDownRadio() {
    const command = new DownCommand(this.radio);

    this.commandManager.execute(command);
  }

  sayBrightnessUpLight() {
    const command = new UpCommand(this.light);

    this.commandManager.execute(command);
  }

  sayBrightnessDownLight() {
    const command = new DownCommand(this.light);

    this.commandManager.execute(command);
  }
}
