import { Command } from "./command";

export interface NavigableCommand extends Command {
  navigate(): void;
}
