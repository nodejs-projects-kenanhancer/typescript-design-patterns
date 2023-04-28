import { CommandManager, MouseClickCallback } from ".";

export class TopMenu {
  private readonly commands = new Map<string, MouseClickCallback>();
  private readonly commandManager: CommandManager;

  private constructor(commandManager: CommandManager) {
    this.commandManager = commandManager;
  }

  static createInstance(commandManager: CommandManager) {
    return new TopMenu(commandManager);
  }

  addMenu(menu: string, onMouseClickCallback: MouseClickCallback) {
    this.commands.set(menu, onMouseClickCallback);
  }

  click(menu: string) {
    const commandCallback = this.commands.get(menu);

    if (commandCallback) {
      const command = commandCallback(-1);

      if (command) {
        this.commandManager.execute(command);
      }
    }
  }
}
