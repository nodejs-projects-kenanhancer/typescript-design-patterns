import {
  ASCII,
  ASCII_PRINTABLE_KEYS,
  ASCII_CONTROL_KEYS,
  ASCII_UPPERCASE_ALPHABET_KEYS,
} from "./ascii";

type ShortCutKeys =
  | `${ASCII_CONTROL_KEYS}+${ASCII_UPPERCASE_ALPHABET_KEYS}`
  | `${ASCII_CONTROL_KEYS}+${ASCII_CONTROL_KEYS}+${ASCII_UPPERCASE_ALPHABET_KEYS}`;

interface Command {
  execute(): void;
  undo(): void;
  redo(): void;
}

class KeyEventArg {
  readonly KeyCode: ASCII_PRINTABLE_KEYS;
  readonly Alt: boolean;
  readonly Control: boolean;
  readonly Shift: boolean;

  constructor(
    keyCode: ASCII_PRINTABLE_KEYS,
    shift: boolean = false,
    alt: boolean = false,
    control: boolean = false
  ) {
    this.KeyCode = keyCode;
    this.Alt = alt;
    this.Control = control;
    this.Shift = shift;
  }

  toString() {
    return [
      ...((this.Control && ["CTRL"]) || []),
      ...((this.Alt && ["ALT"]) || []),
      ...((this.Shift && ["SHIFT"]) || []),
      this.KeyCode.toUpperCase(),
    ].join("+");
  }

  static toKeyEventArg(keys: string) {
    const keyArray = keys.toLowerCase().split("+");

    if (keyArray.length === 0) {
      throw new Error("Keys length can be min 1");
    }

    if (keyArray.length > 4) {
      throw new Error("Keys length can be max 4");
    }

    const ctrl = keyArray.indexOf("ctrl");
    const shift = keyArray.indexOf("shift");
    const alt = keyArray.indexOf("alt");

    if (ctrl > -1) {
      keyArray.splice(ctrl, 1);
    }

    if (shift > -1) {
      keyArray.splice(shift, 1);
    }

    if (alt > -1) {
      keyArray.splice(alt, 1);
    }

    const key = keyArray.pop();

    if (key) {
      const keyEventArg = new KeyEventArg(
        key as ASCII_PRINTABLE_KEYS,
        shift > -1,
        alt > -1,
        ctrl > -1
      );

      return keyEventArg;
    }

    throw new Error("Not Validated");
  }
}

interface KeyPressCommand extends Command {
  executeKeyPress(keyEventArg: KeyEventArg): void;
}

interface MouseClickCommand extends Command {
  executeMouseClick(cursorPosition: number): void;
}

interface MouseKeyDownUpCommand extends Command {
  executeMouseKeyDownUp(
    cursorPosition: number,
    mouseKeyPosition: "down" | "up"
  ): void;
}

// Receiver Contract
type MouseKeyPosition = "click" | "down" | "up";

interface TextEditor {
  getText(): string;
  setCursorPosition(position: number): void;
  getCursorPosition(): number;
  setMouseKeyPosition(position: MouseKeyPosition): void;
  getMouseKeyPosition(): MouseKeyPosition;
  setSelectedText(text: string): void;
  getSelectedText(): string;
  setClipboard(clipboard: string): void;
  getClipboard(): string;
  insert(text: string, cursorPosition: number): void;
  replace(oldText: string, newText: string, cursorPosition: number): void;
  delete(cursorPosition: number, length: number): void;
  backup(): Memento;
  restore(memento: Memento): void;
}

// Receiver
class TextEditorApplication implements TextEditor {
  private text: string = "";
  private clipboard: string = "";
  private selectedText: string = "";
  private cursorPosition: number = -1;
  private mouseKeyPosition: MouseKeyPosition = "click";
  private history: Memento[] = [];

  getText() {
    return this.text;
  }

  setCursorPosition(cursorPosition: number) {
    this.cursorPosition = cursorPosition;
  }

  getCursorPosition() {
    return this.cursorPosition;
  }

  setMouseKeyPosition(position: MouseKeyPosition): void {
    this.mouseKeyPosition = position;
  }

  getMouseKeyPosition(): MouseKeyPosition {
    return this.mouseKeyPosition;
  }

  setSelectedText(text: string) {
    this.selectedText = text;
  }

  getSelectedText() {
    return this.selectedText;
  }

  setClipboard(clipboard: string) {
    this.clipboard = clipboard;
  }

  getClipboard() {
    return this.clipboard;
  }

  insert(text: string, cursorPosition: number) {
    this.text =
      this.text.slice(0, cursorPosition) +
      text +
      this.text.slice(cursorPosition);
  }

  replace(oldText: string, newText: string, cursorPosition: number) {
    this.text =
      this.text.slice(0, cursorPosition) +
      newText +
      this.text.slice(cursorPosition + oldText.length);
  }

  delete(cursorPosition: number, length: number) {
    this.text =
      this.text.slice(0, cursorPosition) +
      this.text.slice(cursorPosition + length);
  }

  backup() {
    const memento: Memento = new Memento(this);

    this.history.push(memento);

    return memento;
  }

  restore(memento: Memento) {
    this.text = memento.text;
    this.clipboard = memento.clipboard;
    this.selectedText = memento.selectedText;
    this.cursorPosition = memento.cursorPosition;
    this.mouseKeyPosition = memento.mouseKeyPosition;
  }
}

// Memento
class Memento {
  readonly text: string = "";
  readonly clipboard: string = "";
  readonly selectedText: string = "";
  readonly cursorPosition: number = -1;
  readonly mouseKeyPosition: MouseKeyPosition = "click";

  constructor(textEditor: TextEditor) {
    this.text = textEditor.getText();
    this.clipboard = textEditor.getClipboard();
    this.selectedText = textEditor.getSelectedText();
    this.cursorPosition = textEditor.getCursorPosition();
    this.mouseKeyPosition = textEditor.getMouseKeyPosition();
  }
}

// Sender/Invoker
type MouseClickCallback = (cursorPosition: number) => Command;
type MouseKeyDownUpCallback = (cursorPosition: number) => Command;
type KeyPressCallback = (keyEventArg: KeyEventArg) => Command;

class ContextMenu {
  private readonly commands = new Map<string, MouseClickCallback>();

  addCommand(operation: string, onMouseClickCallback: MouseClickCallback) {
    this.commands.set(operation, onMouseClickCallback);
  }

  click(operation: string) {
    const commandCallback = this.commands.get(operation);

    if (commandCallback) {
      const command = commandCallback(-1);

      if (command) {
        command.execute();
      }
    }
  }
}

class Shortcut {
  private readonly shortcutKeys = new Map<string, KeyPressCallback>();

  setCommand(shortcutKeys: ShortCutKeys, onKeyPressCallback: KeyPressCallback) {
    // const keyEventArg = KeyEventArg.toKeyEventArg(shortcutKeys);
    // const keys = keyEventArg.toString();
    this.shortcutKeys.set(shortcutKeys, onKeyPressCallback);
  }

  keyPress(keyEventArg: KeyEventArg) {
    const keys = keyEventArg.toString();
    const commandCallback = this.shortcutKeys.get(keys);

    if (commandCallback) {
      const command = commandCallback(keyEventArg);

      if (command) {
        command.execute();
      }
    }
  }
}

class KenanTextEditorUI {
  private readonly textEditor: TextEditor;
  private readonly contextMenu: ContextMenu;
  private readonly shortcut: Shortcut;
  private readonly onKeyPressCallback: KeyPressCallback;
  private readonly onMouseClickCallback: MouseClickCallback;
  private readonly onMouseKeyDownCallback: MouseKeyDownUpCallback;
  private readonly onMouseKeyUpCallback: MouseKeyDownUpCallback;

  constructor(
    textEditor: TextEditor,
    contextMenu: ContextMenu,
    shortcut: Shortcut,
    onKeyPressCallback: KeyPressCallback,
    onMouseClickCallback: MouseClickCallback,
    onMouseKeyDownCallback: MouseKeyDownUpCallback,
    onMouseKeyUpCallback: MouseKeyDownUpCallback
  ) {
    this.textEditor = textEditor;
    this.contextMenu = contextMenu;
    this.shortcut = shortcut;
    this.onKeyPressCallback = onKeyPressCallback;
    this.onMouseClickCallback = onMouseClickCallback;
    this.onMouseKeyDownCallback = onMouseKeyDownCallback;
    this.onMouseKeyUpCallback = onMouseKeyUpCallback;
  }

  keyPress(key: ASCII_PRINTABLE_KEYS) {
    const command = this.onKeyPressCallback(new KeyEventArg(key));

    if (command) {
      command.execute();
    }
  }

  mouseClick(cursorPosition: number) {
    const command = this.onMouseClickCallback(cursorPosition);

    if (command) {
      command.execute();
    }
  }

  mouseKeyDown(cursorPosition: number) {
    const command = this.onMouseKeyDownCallback(cursorPosition);

    if (command) {
      command.execute();
    }
  }

  mouseKeyUp(cursorPosition: number) {
    const command = this.onMouseKeyUpCallback(cursorPosition);

    if (command) {
      command.execute();
    }
  }

  selectText(fromPosition: number, toPosition: number) {
    this.mouseKeyDown(fromPosition);

    this.mouseKeyUp(toPosition);
  }

  clickContextMenu(operation: string) {
    this.contextMenu.click(operation);
  }

  keyPressShortcut(shortcutKeys: ShortCutKeys) {
    const keyEventArg = KeyEventArg.toKeyEventArg(shortcutKeys);

    this.shortcut.keyPress(keyEventArg);
  }

  keyPressSpecialKeys(keys: string) {}

  print() {
    console.log(this.textEditor.getText());
  }
}

// Command
class CopyCommand implements Command {
  private readonly textEditor: TextEditor;
  private readonly selectedText: string;
  private readonly memento: Memento;

  constructor(textEditor: TextEditor, selectedText: string) {
    this.textEditor = textEditor;
    this.selectedText = selectedText;
    this.memento = textEditor.backup();
  }

  execute(): void {
    this.textEditor.setClipboard(this.selectedText);
  }

  undo(): void {
    this.textEditor.restore(this.memento);
  }

  redo(): void {
    this.execute();
  }
}

// Command
class CutCommand implements Command {
  private readonly textEditor: TextEditor;
  private readonly selectedText: string;
  private readonly cursorPosition: number;
  private readonly memento: Memento;

  constructor(
    textEditor: TextEditor,
    selectedText: string,
    cursorPosition: number
  ) {
    this.textEditor = textEditor;
    this.selectedText = selectedText;
    this.cursorPosition = cursorPosition;
    this.memento = textEditor.backup();
  }

  execute(): void {
    if (this.selectedText) {
      this.textEditor.setClipboard(this.selectedText);
      this.textEditor.delete(this.cursorPosition, this.selectedText.length);
    }
  }

  undo(): void {
    this.textEditor.restore(this.memento);
  }

  redo(): void {
    this.execute();
  }
}

// Command
class PasteCommand implements Command {
  private readonly textEditor: TextEditor;
  private readonly clipboard: string;
  private readonly cursorPosition: number;
  private readonly memento: Memento;

  constructor(
    textEditor: TextEditor,
    clipboard: string,
    cursorPosition: number
  ) {
    this.textEditor = textEditor;
    this.clipboard = clipboard;
    this.cursorPosition = cursorPosition;
    this.memento = textEditor.backup();
  }

  execute(): void {
    if (this.clipboard && this.cursorPosition >= 0) {
      this.textEditor.insert(this.clipboard, this.cursorPosition);
      this.textEditor.setCursorPosition(
        this.cursorPosition + this.clipboard.length + 1
      );
    }
  }

  undo(): void {
    this.textEditor.restore(this.memento);
  }

  redo(): void {
    this.execute();
  }
}

// Command
class KeyPressedCommand implements Command {
  private readonly textEditor: TextEditor;
  private readonly text;
  private readonly keyEventArg: KeyEventArg;
  private readonly position: number = -1;
  private readonly memento: Memento;

  constructor(textEditor: TextEditor, text: string, keyEventArg: KeyEventArg) {
    this.textEditor = textEditor;
    this.text = text;
    const cursorPosition = textEditor.getCursorPosition();

    if (cursorPosition >= 0) {
      this.position = cursorPosition + this.text.length + 1;
    } else {
      this.position = this.text.length + 1;
    }
    this.keyEventArg = keyEventArg;
    this.memento = textEditor.backup();
  }

  execute(): void {
    const asciiRecord = ASCII[this.keyEventArg.KeyCode];

    if (asciiRecord) {
      const character = asciiRecord.symbol;

      if (character && this.position > 0) {
        this.textEditor.insert(character, this.position);
      }
    }
  }

  undo(): void {
    this.textEditor.restore(this.memento);
  }

  redo(): void {
    this.execute();
  }
}

// Command
class MouseClickedCommand implements Command {
  private readonly textEditor: TextEditor;
  private readonly cursorPosition: number = -1;
  private readonly memento: Memento;

  constructor(textEditor: TextEditor, cursorPosition: number) {
    this.textEditor = textEditor;
    this.cursorPosition = cursorPosition;
    this.memento = this.textEditor.backup();
  }

  execute(): void {
    if (this.cursorPosition >= 0) {
      this.textEditor.setCursorPosition(this.cursorPosition);
      this.textEditor.setMouseKeyPosition("click");
    }
  }

  undo(): void {
    this.textEditor.restore(this.memento);
  }

  redo(): void {
    this.execute();
  }
}

// Command
class MouseKeyDownCommand implements Command {
  private readonly textEditor: TextEditor;
  private readonly cursorPosition: number = -1;
  private readonly memento: Memento;

  constructor(textEditor: TextEditor, cursorPosition: number) {
    this.textEditor = textEditor;
    this.cursorPosition = cursorPosition;
    this.memento = this.textEditor.backup();
  }

  execute(): void {
    if (this.cursorPosition >= 0) {
      this.textEditor.setCursorPosition(this.cursorPosition);
      this.textEditor.setMouseKeyPosition("down");
    }
  }

  undo(): void {
    this.textEditor.restore(this.memento);
  }

  redo(): void {
    this.execute();
  }
}

// Command
class MouseKeyUpCommand implements Command {
  private readonly textEditor: TextEditor;
  private readonly cursorPosition: number = -1;
  private readonly memento: Memento;

  constructor(textEditor: TextEditor, cursorPosition: number) {
    this.textEditor = textEditor;
    this.cursorPosition = cursorPosition;
    this.memento = this.textEditor.backup();
  }

  execute(): void {
    if (this.cursorPosition >= 0) {
      if (this.memento.mouseKeyPosition === "down") {
        const text = this.textEditor.getText();

        const selectedText = text.substring(
          this.memento.cursorPosition,
          this.cursorPosition
        );

        this.textEditor.setSelectedText(selectedText);
      }

      // this.textEditor.setCursorPosition(this.cursorPosition);
      this.textEditor.setMouseKeyPosition("up");
    }
  }

  undo(): void {
    this.textEditor.restore(this.memento);
  }

  redo(): void {
    this.execute();
  }
}

// Command
class DeleteCommand implements Command {
  private readonly textEditor: TextEditor;
  private readonly text: string;
  private readonly position: number;

  constructor(textEditor: TextEditor, text: string, position: number) {
    this.textEditor = textEditor;
    this.text = text;
    this.position = position;
  }

  execute(): void {
    this.textEditor.delete(this.position, this.text.length);
  }

  undo(): void {
    this.textEditor.insert(this.text, this.position);
  }

  redo(): void {
    this.execute();
  }
}

// Command
class ReplaceCommand implements Command {
  private readonly textEditor: TextEditor;
  private readonly oldText: string;
  private readonly newText: string;
  private readonly position: number;

  constructor(
    textEditor: TextEditor,
    oldText: string,
    newText: string,
    position: number
  ) {
    this.textEditor = textEditor;
    this.oldText = oldText;
    this.newText = newText;
    this.position = position;
  }

  execute(): void {
    this.textEditor.replace(this.oldText, this.newText, this.position);
  }

  undo(): void {
    this.textEditor.replace(this.newText, this.oldText, this.position);
  }

  redo(): void {
    this.execute();
  }
}

// Factory
interface TextEditorCommandFactory {
  getCopyCommand(): Command;
  getCutCommand(): Command;
  getPasteCommand(): Command;
  getKeyPressedCommand(keyEventArg: KeyEventArg): Command;
  getMouseClickCommand(cursorPosition: number): Command;
  getMouseKeyDownCommand(cursorPosition: number): Command;
  getMouseKeyUpCommand(cursorPosition: number): Command;
}

class KenanTextEditorCommandFactory implements TextEditorCommandFactory {
  private readonly textEditor: TextEditor;

  constructor(textEditor: TextEditor) {
    this.textEditor = textEditor;
  }

  getCopyCommand(): Command {
    const selectedText = this.textEditor.getSelectedText();

    return new CopyCommand(this.textEditor, selectedText);
  }

  getCutCommand(): Command {
    const selectedText = this.textEditor.getSelectedText();
    const cursorPosition = this.textEditor.getCursorPosition();

    return new CutCommand(this.textEditor, selectedText, cursorPosition);
  }

  getPasteCommand(): Command {
    const clipboard = this.textEditor.getClipboard();
    const cursorPosition = this.textEditor.getCursorPosition();

    return new PasteCommand(this.textEditor, clipboard, cursorPosition);
  }

  getKeyPressedCommand(keyEventArg: KeyEventArg): Command {
    const text = this.textEditor.getText();

    return new KeyPressedCommand(this.textEditor, text, keyEventArg);
  }

  getMouseClickCommand(cursorPosition: number): Command {
    return new MouseClickedCommand(this.textEditor, cursorPosition);
  }

  getMouseKeyDownCommand(cursorPosition: number): Command {
    return new MouseKeyDownCommand(this.textEditor, cursorPosition);
  }

  getMouseKeyUpCommand(cursorPosition: number): Command {
    return new MouseKeyUpCommand(this.textEditor, cursorPosition);
  }
}

// Client
class ClientCommand {
  static main() {
    const textEditor: TextEditor = new TextEditorApplication();

    const textEditorCommandFactory: TextEditorCommandFactory =
      new KenanTextEditorCommandFactory(textEditor);

    const contextMenu = new ContextMenu();

    contextMenu.addCommand(
      "copy",
      textEditorCommandFactory.getCopyCommand.bind(textEditorCommandFactory)
    );

    contextMenu.addCommand(
      "cut",
      textEditorCommandFactory.getCutCommand.bind(textEditorCommandFactory)
    );

    contextMenu.addCommand(
      "paste",
      textEditorCommandFactory.getPasteCommand.bind(textEditorCommandFactory)
    );

    const shortcut = new Shortcut();

    shortcut.setCommand(
      "CTRL+C",
      textEditorCommandFactory.getCopyCommand.bind(textEditorCommandFactory)
    );

    shortcut.setCommand(
      "CTRL+X",
      textEditorCommandFactory.getCutCommand.bind(textEditorCommandFactory)
    );

    shortcut.setCommand(
      "CTRL+V",
      textEditorCommandFactory.getPasteCommand.bind(textEditorCommandFactory)
    );

    const onKeyPressCallback: KeyPressCallback = (keyEventArg) => {
      return textEditorCommandFactory.getKeyPressedCommand(keyEventArg);
    };

    const onMouseClickCallback: MouseClickCallback = (cursorPosition) => {
      return textEditorCommandFactory.getMouseClickCommand(cursorPosition);
    };

    const onMouseKeyDownCallback: MouseKeyDownUpCallback = (cursorPosition) => {
      return textEditorCommandFactory.getMouseKeyDownCommand(cursorPosition);
    };

    const onMouseKeyUpCallback: MouseKeyDownUpCallback = (cursorPosition) => {
      return textEditorCommandFactory.getMouseKeyUpCommand(cursorPosition);
    };

    const ui = new KenanTextEditorUI(
      textEditor,
      contextMenu,
      shortcut,
      onKeyPressCallback,
      onMouseClickCallback,
      onMouseKeyDownCallback,
      onMouseKeyUpCallback
    );

    ui.keyPress("H");
    ui.keyPress("e");
    ui.keyPress("l");
    ui.keyPress("l");
    ui.keyPress("o");
    ui.keyPress("SPACE");
    ui.keyPress("W");
    ui.keyPress("o");
    ui.keyPress("r");
    ui.keyPress("l");
    ui.keyPress("d");
    ui.keyPress("!");

    ui.mouseKeyDown(0);

    ui.mouseKeyUp(5);

    ui.clickContextMenu("copy");

    ui.mouseClick(12);

    ui.keyPressShortcut("CTRL+V");

    ui.keyPress("SPACE");
    ui.keyPress("J");
    ui.keyPress("u");
    ui.keyPress("p");
    ui.keyPress("i");
    ui.keyPress("t");
    ui.keyPress("e");
    ui.keyPress("r");
    ui.keyPress("!");

    ui.selectText(12, 17);

    ui.keyPressShortcut("CTRL+X");

    ui.mouseClick(12);

    ui.keyPress('H');

    ui.keyPress('i');

    ui.print();
  }
}

ClientCommand.main();

export {};
