import { Command } from "./command";

export interface ReversibleCommand extends Command {
  undo(): void;
}
