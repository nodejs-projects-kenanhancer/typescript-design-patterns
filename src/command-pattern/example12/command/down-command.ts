import { Dimmable } from "../receiver";
import { Command } from "./command";

export class DownCommand implements Command {
  private readonly dimmable: Dimmable;

  constructor(dimmable: Dimmable) {
    this.dimmable = dimmable;
  }

  execute(): void {
    this.dimmable.down();
  }

  undo(): void {
    this.dimmable.up();
  }
}
