import { CommandManager } from "../sender";
import { Command } from "./command";

// Command
export class UndoCommand implements Command {
  private readonly commandManager: CommandManager;

  constructor(commandManager: CommandManager) {
    this.commandManager = commandManager;
  }

  execute(): void {
    this.commandManager.undo();
  }
}
