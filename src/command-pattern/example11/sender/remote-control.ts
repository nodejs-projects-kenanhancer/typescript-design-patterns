import { CommandManager, SwitchOffCommand, SwitchOnCommand } from "../command";
import { Switchable } from "../receiver";

export class RemoteControl {
  private readonly switchable: Switchable;
  private readonly commandManager: CommandManager;

  constructor(switchable: Switchable, commandManager: CommandManager) {
    this.switchable = switchable;
    this.commandManager = commandManager;
  }

  pressOnButton() {
    const command = new SwitchOnCommand(this.switchable);

    this.commandManager.execute(command);
  }

  pressOffButton() {
    const command = new SwitchOffCommand(this.switchable);

    this.commandManager.execute(command);
  }
}
