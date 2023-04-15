import { KeyEventArg, KeyPressCallback, ShortCutKeys } from ".";

export class Shortcut {
  private readonly shortcutKeys = new Map<string, KeyPressCallback>();

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

      command.execute();
    }
  }
}
