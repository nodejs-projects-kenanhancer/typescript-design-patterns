import {
  CommandManager,
  DownCommand,
  SwitchOffCommand,
  SwitchOnCommand,
  UpCommand,
} from "../command";
import { Dimmable, Switchable } from "../receiver";

export class RemoteControl {
  private readonly switchableDimmable: Switchable & Dimmable;
  private readonly commandManager: CommandManager;

  constructor(
    switchableDimmable: Switchable & Dimmable,
    commandManager: CommandManager
  ) {
    this.switchableDimmable = switchableDimmable;
    this.commandManager = commandManager;
  }

  pressOnButton() {
    const command = new SwitchOnCommand(this.switchableDimmable);

    this.commandManager.execute(command);
  }

  pressOffButton() {
    const command = new SwitchOffCommand(this.switchableDimmable);

    this.commandManager.execute(command);
  }

  pressUpButton() {
    const command = new UpCommand(this.switchableDimmable);

    this.commandManager.execute(command);
  }

  pressDownButton() {
    const command = new DownCommand(this.switchableDimmable);

    this.commandManager.execute(command);
  }
}
