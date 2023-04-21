import { Switchable } from "../receiver";
import { Command } from "./command";

export class SwitchOffCommand implements Command {
  private readonly switchable: Switchable;

  constructor(switchable: Switchable) {
    this.switchable = switchable;
  }

  execute(): void {
    this.switchable.switchOff();
  }

  undo(): void {
    this.switchable.switchOn();
  }
}
