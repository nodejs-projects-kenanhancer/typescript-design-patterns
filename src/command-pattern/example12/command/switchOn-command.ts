import { Switchable } from "../receiver";
import { Command } from "./command";

export class SwitchOnCommand implements Command {
  private readonly switchable: Switchable;

  constructor(switchable: Switchable) {
    this.switchable = switchable;
  }

  execute(): void {
    this.switchable.switchOn();
  }

  undo(): void {
    this.switchable.switchOff();
  }
}
