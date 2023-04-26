import { CommandManager, KeyEventArg, KeyPressCallback, ShortCutKeys } from ".";

export class Shortcut {
  private readonly shortcutKeys = new Map<string, KeyPressCallback>();
  private readonly commandManager: CommandManager;

  private constructor(commandManager: CommandManager) {
    this.commandManager = commandManager;
  }

  static createInstance(commandManager: CommandManager) {
    return new Shortcut(commandManager);
  }

  addShortcutKey(
    shortcutKeys: ShortCutKeys,
    onKeyPressCallback: KeyPressCallback
  ) {
    // const keyEventArg = KeyEventArg.toKeyEventArg(shortcutKeys);
    // const keys = keyEventArg.toString();
    this.shortcutKeys.set(shortcutKeys, onKeyPressCallback);
  }

  keyPress(keyEventArg: KeyEventArg) {
    const keys = keyEventArg.toString();
    const commandCallback = this.shortcutKeys.get(keys);

    if (commandCallback) {
      const command = commandCallback(keyEventArg);

      this.commandManager.execute(command);
    }
  }
}
