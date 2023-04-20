import { Command } from "./command";

export interface CommandManager {
  execute(command: Command): void;
  undo(): void;
  redo(): void;
}
