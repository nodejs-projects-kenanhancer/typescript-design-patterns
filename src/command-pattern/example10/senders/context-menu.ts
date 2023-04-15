import { MouseClickCallback } from ".";

export class ContextMenu {
  private readonly commands = new Map<string, MouseClickCallback>();

  addMenu(menu: string, onMouseClickCallback: MouseClickCallback) {
    this.commands.set(menu, onMouseClickCallback);
  }

  click(menu: string) {
    const commandCallback = this.commands.get(menu);

    if (commandCallback) {
      const command = commandCallback(-1);

      command.execute();
    }
  }
}
