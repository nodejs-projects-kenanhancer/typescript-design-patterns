interface Command {
  name: string;
  execute(): void;
}

// Receiver
class TextEditorApplication {
  private clipboard: string = "";
  private backup: string = "";

  getClipboard() {
    return this.clipboard;
  }

  setClipboard(clipboard: string) {
    this.clipboard = clipboard;
  }

  backupClipboard() {
    this.backup = this.clipboard;
  }

  setClipboardFromBackup() {
    this.clipboard = this.backup;
  }

  resetClipboard() {
    this.clipboard = "";
  }
}

// Sender
class Menu {
  private readonly menuItems = new Map<string, Command>();

  setCommand(operation: string, command: Command) {
    this.menuItems.set(operation, command);
  }

  click(operation: string) {
    const command = this.menuItems.get(operation);

    if (command) {
      command.execute();
    } else {
      throw new Error(operation + " command does not exists");
    }
  }
}

// Sender
class Shortcut {
  shortcutKeys = new Map<string, Command>();

  setCommand(keys: string, command: Command) {
    this.shortcutKeys.set(keys, command);
  }

  keyPress(pressedKeys: string) {
    const command = this.shortcutKeys.get(pressedKeys);

    if (command) {
      command.execute();
    } else {
      throw new Error(pressedKeys + " shortcut does not exists");
    }
  }
}

// Command
class CopyCommand implements Command {
  readonly name: string = "copy";
  private readonly app: TextEditorApplication;
  private readonly selectedText: string;

  constructor(app: TextEditorApplication, selectedText: string) {
    this.app = app;
    this.selectedText = selectedText;
  }

  execute(): void {
    console.log("Copy Selected Text: " + this.selectedText);
    this.app.setClipboard(this.selectedText);
  }
}

// Command
class PasteCommand implements Command {
  readonly name: string = "paste";
  private readonly app: TextEditorApplication;

  constructor(app: TextEditorApplication) {
    this.app = app;
  }

  execute(): void {
    const pasteText = this.app.getClipboard();

    console.log("Paste Copied Text: " + pasteText);
    this.app.backupClipboard();
    this.app.setClipboard(pasteText);
  }
}

// Command
class UndoCommand implements Command {
  readonly name: string = "undo";
  private readonly app: TextEditorApplication;

  constructor(app: TextEditorApplication) {
    this.app = app;
  }

  execute(): void {
    this.app.resetClipboard();

    console.log("Undo Text: " + this.app.getClipboard());
  }
}

// Command
class RedoCommand implements Command {
  readonly name: string = "redo";
  private readonly app: TextEditorApplication;

  constructor(app: TextEditorApplication) {
    this.app = app;
  }

  execute(): void {
    this.app.setClipboardFromBackup();

    console.log("Redo from Backup: " + this.app.getClipboard());
  }
}

// Client
class CommandClient {
  static main() {
    const menu = new Menu();
    const shortcut = new Shortcut();
    const textEditorApp = new TextEditorApplication();

    const copyCommand = new CopyCommand(textEditorApp, "Hello World");
    const pasteCommand = new PasteCommand(textEditorApp);
    const undoCommand = new UndoCommand(textEditorApp);
    const redoCommand = new RedoCommand(textEditorApp);

    menu.setCommand("copy", copyCommand);
    menu.setCommand("paste", pasteCommand);
    menu.setCommand("undo", undoCommand);
    menu.setCommand("redo", redoCommand);

    shortcut.setCommand("CTRL+C", copyCommand);
    shortcut.setCommand("CTRL+V", pasteCommand);
    shortcut.setCommand("CTRL+Z", undoCommand);
    shortcut.setCommand("CTRL+SHIFT+Z", redoCommand);

    menu.click("copy");
    menu.click("paste");
    menu.click("undo");
    menu.click("redo");

    shortcut.keyPress("CTRL+C");
    shortcut.keyPress("CTRL+V");
    shortcut.keyPress("CTRL+Z");
    shortcut.keyPress("CTRL+SHIFT+Z");

    menu.click("copy");
    shortcut.keyPress("CTRL+V");
    menu.click("undo");
    shortcut.keyPress("CTRL+SHIFT+Z");
  }
}

CommandClient.main();

export {};
