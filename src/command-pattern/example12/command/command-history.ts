import { Command } from "./command";
import { CommandManager } from "./command-manager";

export class CommandHistory implements CommandManager {
  private readonly history: Command[] = [];
  private readonly undone: Command[] = [];

  execute(command: Command) {
    command.execute();
    this.history.push(command);
    this.undone.splice(0, this.undone.length);
  }

  undo() {
    if (this.history.length === 0) {
      return;
    }

    const command = this.history.pop();

    if (command) {
      command.undo();
      this.undone.push(command);
    }
  }

  redo() {
    if (this.undone.length === 0) {
      return;
    }

    const command = this.undone.pop();

    if (command) {
      command.execute();
      this.history.push(command);
    }
  }
}
