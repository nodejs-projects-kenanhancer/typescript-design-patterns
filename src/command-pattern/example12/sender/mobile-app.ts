import {
  CommandManager,
  DownCommand,
  SwitchOffCommand,
  SwitchOnCommand,
  UpCommand,
} from "../command";
import { Dimmable, Switchable } from "../receiver";

export class MobileApp {
  private readonly switchableDimmable: Switchable & Dimmable;
  private readonly commandManager: CommandManager;

  constructor(
    switchableDimmable: Switchable & Dimmable,
    commandManager: CommandManager
  ) {
    this.switchableDimmable = switchableDimmable;
    this.commandManager = commandManager;
  }

  tapOnButton() {
    const command = new SwitchOnCommand(this.switchableDimmable);

    this.commandManager.execute(command);
  }

  tapOffButton() {
    const command = new SwitchOffCommand(this.switchableDimmable);

    this.commandManager.execute(command);
  }

  tapUpButton() {
    const command = new UpCommand(this.switchableDimmable);

    this.commandManager.execute(command);
  }

  tapDownButton() {
    const command = new DownCommand(this.switchableDimmable);

    this.commandManager.execute(command);
  }
}
