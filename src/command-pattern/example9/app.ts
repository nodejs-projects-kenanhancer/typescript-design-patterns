interface Command {
  execute(): void;
  undo(): void;
  redo(): void;
}

enum Keys {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  H = "H",
  I = "I",
  J = "J",
  K = "K",
  L = "L",
  M = "M",
  N = "N",
  O = "O",
  P = "P",
  Q = "Q",
  R = "R",
  S = "S",
  T = "T",
  U = "U",
  V = "V",
  W = "W",
  X = "X",
  Y = "Y",
  Z = "Z",
  Hyphen = "-",
  Underscore = "_",
  Asterisk = "*",
  Plus = "+",
  Exclamation = "!",
  Percent = "%",
  $ = "$",
  OpenParanthesis = "(",
  CloseParanthesis = ")",
  OpenBrace = "{",
  CloseBrace = "}",
  OpenBracket = "[",
  CloseBracket = "]",
  Esc = "Esc",
  Control = "Control",
  Shift = "Shift",
  Alt = "Alt",
  Space = "Space",
  Back = "Back",
  F1 = "F1",
  F2 = "F2",
  F3 = "F3",
  F4 = "F4",
  F5 = "F5",
  F6 = "F6",
  F7 = "F7",
  F8 = "F8",
  F9 = "F9",
  F10 = "F10",
  F11 = "F11",
  F12 = "F12",
}

class KeyEventArg {
  readonly KeyCode: Keys;
  readonly Alt: boolean;
  readonly Control: boolean;
  readonly Shift: boolean;

  constructor(
    keyCode: Keys,
    shift: boolean = false,
    alt: boolean = false,
    control: boolean = false
  ) {
    this.KeyCode = keyCode;
    this.Alt = alt;
    this.Control = control;
    this.Shift = shift;
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
}

// Receiver
class TextEditorApplication implements TextEditor {
  private text: string = "";
  private clipboard: string = "";
  private selectedText: string = "";
  private cursorPosition: number = -1;
  private mouseKeyPosition: MouseKeyPosition = "click";

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
}

// Sender/Invoker
class ContextMenu {
  private readonly commands = new Map<string, Command>();

  setCommand(operation: string, onMouseClick: Command) {
    this.commands.set(operation, onMouseClick);
  }

  click(operation: string) {
    const command = this.commands.get(operation);

    if (command) {
      command.execute();
    }
  }
}

class Shortcut {
  private readonly shortcutKeys = new Map<string, Command>();

  setCommand(keys: string, onKeyPress: Command) {
    this.shortcutKeys.set(keys, onKeyPress);
  }

  keyPress(keys: string) {
    const command = this.shortcutKeys.get(keys);

    if (command) {
      command.execute();
    }
  }
}

class TextEditorUI {
  private readonly textEditor: TextEditor;
  private readonly contextMenu: ContextMenu;
  private readonly shortcut: Shortcut;
  private readonly onKeyPress: KeyPressCommand;
  private readonly onMouseClick: MouseClickCommand;
  private readonly onMouseKeyDownUp: MouseKeyDownUpCommand;

  constructor(
    textEditor: TextEditor,
    contextMenu: ContextMenu,
    shortcut: Shortcut,
    onKeyPress: KeyPressCommand,
    onMouseClick: MouseClickCommand,
    onMouseKeyDownUp: MouseKeyDownUpCommand
  ) {
    this.textEditor = textEditor;
    this.contextMenu = contextMenu;
    this.shortcut = shortcut;
    this.onKeyPress = onKeyPress;
    this.onMouseClick = onMouseClick;
    this.onMouseKeyDownUp = onMouseKeyDownUp;
  }

  keyPress(key: Keys, shift: boolean = false) {
    this.onKeyPress.executeKeyPress(new KeyEventArg(key, shift));
  }

  mouseClick(cursorPosition: number) {
    this.onMouseClick.executeMouseClick(cursorPosition);
  }

  mouseKeyDown(cursorPosition: number) {
    this.onMouseKeyDownUp.executeMouseKeyDownUp(cursorPosition, "down");
  }

  mouseKeyUp(cursorPosition: number) {
    this.onMouseKeyDownUp.executeMouseKeyDownUp(cursorPosition, "up");
  }

  selectText(fromPosition: number, toPosition: number) {
    const text = this.textEditor.getText();

    const selectedText = text.substring(fromPosition, toPosition);

    this.textEditor.setSelectedText(selectedText);
  }

  clickContextMenu(operation: string) {
    this.contextMenu.click(operation);
  }

  keyPressShortcut(keys: string) {
    this.shortcut.keyPress(keys);
  }

  keyPressSpecialKeys(keys: string) {}

  print() {
    console.log(this.textEditor.getText());
  }
}

// Command
class CopyCommand implements Command {
  private readonly textEditor: TextEditor;
  private readonly clipboard: string;
  private readonly selectedText: string;

  constructor(textEditor: TextEditor) {
    this.textEditor = textEditor;
    this.clipboard = this.textEditor.getClipboard();
    this.selectedText = this.textEditor.getSelectedText();
  }

  execute(): void {
    if (this.selectedText) {
      this.textEditor.setClipboard(this.selectedText);
    }
  }

  undo(): void {
    if (this.clipboard) {
      this.textEditor.setClipboard(this.clipboard);
    }
  }

  redo(): void {
    this.execute();
  }
}

// Command
class CutCommand implements Command {
  private readonly textEditor: TextEditor;
  private readonly clipboard: string;
  private readonly selectedText: string;
  private readonly cursorPosition: number;

  constructor(textEditor: TextEditor) {
    this.textEditor = textEditor;
    this.clipboard = this.textEditor.getClipboard();
    this.selectedText = this.textEditor.getSelectedText();
    this.cursorPosition = this.textEditor.getCursorPosition();
  }

  execute(): void {
    if (this.selectedText) {
      this.textEditor.setClipboard(this.selectedText);
      this.textEditor.delete(this.cursorPosition, this.selectedText.length);
    }
  }

  undo(): void {
    if (this.clipboard) {
      this.textEditor.setClipboard(this.clipboard);
      this.textEditor.insert(this.clipboard, this.cursorPosition);
    }
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

  constructor(textEditor: TextEditor) {
    this.textEditor = textEditor;
    this.clipboard = textEditor.getClipboard();
    this.cursorPosition = textEditor.getCursorPosition();
  }

  execute(): void {
    if (this.clipboard && this.cursorPosition >= 0) {
      this.textEditor.insert(this.clipboard, this.cursorPosition);
    }
  }

  undo(): void {
    if (this.clipboard) {
      this.textEditor.delete(this.cursorPosition, this.clipboard.length);
    }
  }

  redo(): void {
    this.execute();
  }
}

// Command
class KeyPressedCommand implements KeyPressCommand {
  private readonly textEditor: TextEditor;
  private readonly text;
  private character: string = "";
  private position: number = -1;

  constructor(textEditor: TextEditor) {
    this.textEditor = textEditor;
    this.text = textEditor.getText();
  }

  executeKeyPress(keyEventArg: KeyEventArg): void {
    this.position = this.text.length + 1;
    this.character = keyEventArg.KeyCode;

    this.execute();
  }

  execute(): void {
    if (this.character && this.position > 0) {
      this.textEditor.insert(this.character, this.position);
    }
  }

  undo(): void {
    this.textEditor.delete(this.position, this.character.length);
  }

  redo(): void {
    this.execute();
  }
}

// Command
class MouseClickedCommand implements MouseClickCommand {
  private readonly textEditor: TextEditor;
  private cursorPosition: number = -1;

  constructor(textEditor: TextEditor) {
    this.textEditor = textEditor;
  }

  executeMouseClick(cursorPosition: number): void {
    this.cursorPosition = cursorPosition;

    this.execute();
  }

  execute(): void {
    if (this.cursorPosition >= 0) {
      this.textEditor.setCursorPosition(this.cursorPosition);
      this.textEditor.setMouseKeyPosition("click");
    }
  }

  undo(): void {
    this.textEditor.setMouseKeyPosition("click");
  }

  redo(): void {
    this.execute();
  }
}

// Command
class MouseKeyDownUpClickedCommand implements MouseKeyDownUpCommand {
  private readonly textEditor: TextEditor;
  private cursorPosition: number = -1;
  private mouseKeyPosition: "down" | "up" = "up";
  private prevMouseKeyPosition: MouseKeyPosition;
  private prevCursorPosition: number;

  constructor(textEditor: TextEditor) {
    this.textEditor = textEditor;
    this.prevMouseKeyPosition = this.textEditor.getMouseKeyPosition();
    this.prevCursorPosition = this.textEditor.getCursorPosition();
  }

  executeMouseKeyDownUp(
    cursorPosition: number,
    mouseKeyPosition: "down" | "up"
  ): void {
    this.cursorPosition = cursorPosition;
    this.mouseKeyPosition = mouseKeyPosition;

    this.execute();
  }

  execute(): void {
    if (this.cursorPosition >= 0) {
      if (
        this.prevMouseKeyPosition === "down" &&
        this.mouseKeyPosition === "up"
      ) {
        const text = this.textEditor.getText();

        const selectedText = text.substring(
          this.prevCursorPosition,
          this.cursorPosition
        );

        this.textEditor.setSelectedText(selectedText);
      }

      this.textEditor.setCursorPosition(this.cursorPosition);
      this.textEditor.setMouseKeyPosition(this.mouseKeyPosition);
    }
  }

  undo(): void {
    this.textEditor.setCursorPosition(this.prevCursorPosition);
    this.textEditor.setMouseKeyPosition(this.prevMouseKeyPosition);
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

// Client
class ClientCommand {
  static main() {
    const textEditor: TextEditor = new TextEditorApplication();

    const copyCommand: Command = new CopyCommand(textEditor);

    const cutCommand: Command = new CutCommand(textEditor);

    const pasteCommand: Command = new PasteCommand(textEditor);

    const keyPressCommand: KeyPressCommand = new KeyPressedCommand(textEditor);

    const mouseClickCommand: MouseClickCommand = new MouseClickedCommand(
      textEditor
    );

    const mouseUpDownCommand: MouseKeyDownUpCommand =
      new MouseKeyDownUpClickedCommand(textEditor);

    // const deleteCommand: Command = new DeleteCommand(textEditor, "", 0);

    // const replaceCommand: Command = new ReplaceCommand(textEditor, "", "", 0);

    const contextMenu = new ContextMenu();

    contextMenu.setCommand("copy", copyCommand);

    contextMenu.setCommand("cut", cutCommand);

    contextMenu.setCommand("paste", pasteCommand);

    const shortcut = new Shortcut();

    shortcut.setCommand("CTRL+C", copyCommand);

    shortcut.setCommand("CTRL+X", cutCommand);

    shortcut.setCommand("CTRL+V", pasteCommand);

    const ui = new TextEditorUI(
      textEditor,
      contextMenu,
      shortcut,
      keyPressCommand,
      mouseClickCommand,
      mouseUpDownCommand
    );

    ui.keyPress(Keys.H, true);
    ui.keyPress(Keys.E);
    ui.keyPress(Keys.L);
    ui.keyPress(Keys.L);
    ui.keyPress(Keys.O);
    ui.keyPress(Keys.Space);
    ui.keyPress(Keys.W, true);
    ui.keyPress(Keys.O);
    ui.keyPress(Keys.R);
    ui.keyPress(Keys.L);
    ui.keyPress(Keys.D);
    ui.keyPress(Keys.Exclamation);

    ui.mouseKeyDown(0);

    ui.mouseKeyUp(5);

    ui.clickContextMenu("copy");

    ui.mouseClick(12);

    ui.keyPressShortcut("CTRL+V");

    ui.keyPress(Keys.Space);
    ui.keyPress(Keys.J, true);
    ui.keyPress(Keys.U);
    ui.keyPress(Keys.P);
    ui.keyPress(Keys.I);
    ui.keyPress(Keys.T);
    ui.keyPress(Keys.E);
    ui.keyPress(Keys.R);
    ui.keyPress(Keys.Exclamation);

    ui.selectText(12, 17);

    ui.keyPressShortcut("CTRL+C");

    // ui.clickContextMenu("cut");

    // ui.cl;

    ui.print();
  }
}

ClientCommand.main();

export {};
