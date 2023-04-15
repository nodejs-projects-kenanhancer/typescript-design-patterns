import { Command } from "../commands";

export class CommandHistory {
  private readonly commands: Command[] = [];
  private currentStateIndex: number = 0;

  get currentState() {
    return this.commands[this.currentStateIndex];
  }

  save(command: Command) {
    const index = this.commands.push(command);
    this.currentStateIndex = index - 1;
  }
}
