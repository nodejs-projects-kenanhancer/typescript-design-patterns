import { Dimmable } from "../receiver";
import { Command } from "./command";

export class UpCommand implements Command {
  private readonly dimmable: Dimmable;

  constructor(dimmable: Dimmable) {
    this.dimmable = dimmable;
  }

  execute(): void {
    this.dimmable.up();
  }

  undo(): void {
    this.dimmable.down();
  }
}
