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
    if (ctrl > -1) {
      keyArray.splice(ctrl, 1);
    }

    const shift = keyArray.indexOf("shift");
    if (shift > -1) {
      keyArray.splice(shift, 1);
    }

    const alt = keyArray.indexOf("alt");
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
  createSnapshot(): EditorState;
  restore(editorState: EditorState): void;
}

// // Memento (Immutable State)
class EditorState {
  readonly text: string;
  readonly clipboard: string;
  readonly selectedText: string;
  readonly cursorPosition: number;
  readonly mouseKeyPosition: MouseKeyPosition;

  constructor(
    text: string = "",
    clipboard: string = "",
    selectedText: string = "",
    cursorPosition: number = -1,
    mouseKeyPosition: MouseKeyPosition = "click"
  ) {
    this.text = text;
    this.clipboard = clipboard;
    this.selectedText = selectedText;
    this.cursorPosition = cursorPosition;
    this.mouseKeyPosition = mouseKeyPosition;
  }
}

// CareTaker
class TextEditorHistory {
  private readonly snapshots: EditorState[] = [];
  private currentStateIndex: number = 0;

  get currentState() {
    return this.snapshots[this.currentStateIndex];
  }

  save(editorState: EditorState) {
    this.snapshots.push(editorState);
    this.currentStateIndex = this.snapshots.length;
  }

  undo() {
    if (this.currentStateIndex > 0) {
      this.currentStateIndex--;

      return this.snapshots[this.currentStateIndex];
    }
  }

  redo() {
    if (this.snapshots.length <= this.currentStateIndex) {
      this.currentStateIndex++;

      return this.snapshots[this.currentStateIndex];
    }
  }
}

class CommandHistory {
  private readonly commands: Command[] = [];
  private currentStateIndex: number = 0;

  get currentState() {
    return this.commands[this.currentStateIndex];
  }

  save(command: Command) {
    const index = this.commands.push(command);
    this.currentStateIndex = index - 1;
  }

  undo() {
    if (this.currentStateIndex >= 0) {
      const command = this.commands[this.currentStateIndex];

      command.undo();

      this.currentStateIndex--;

      return command;
    }
  }

  redo() {
    if (this.currentStateIndex < this.commands.length - 1) {
      this.currentStateIndex++;

      const command = this.commands[this.currentStateIndex];

      command.redo();

      return command;
    }
  }
}

// Receiver
class TextEditorApplication implements TextEditor {
  private editorState: EditorState = new EditorState();

  getText() {
    return this.editorState.text;
  }

  setCursorPosition(cursorPosition: number) {
    this.editorState = new EditorState(
      this.editorState.text,
      this.editorState.clipboard,
      this.editorState.selectedText,
      cursorPosition,
      this.editorState.mouseKeyPosition
    );
  }

  getCursorPosition() {
    return this.editorState.cursorPosition;
  }

  setMouseKeyPosition(position: MouseKeyPosition): void {
    this.editorState = new EditorState(
      this.editorState.text,
      this.editorState.clipboard,
      this.editorState.selectedText,
      this.editorState.cursorPosition,
      position
    );
  }

  getMouseKeyPosition(): MouseKeyPosition {
    return this.editorState.mouseKeyPosition;
  }

  setSelectedText(text: string) {
    this.editorState = new EditorState(
      this.editorState.text,
      this.editorState.clipboard,
      text,
      this.editorState.cursorPosition,
      this.editorState.mouseKeyPosition
    );
  }

  getSelectedText() {
    return this.editorState.selectedText;
  }

  setClipboard(clipboard: string) {
    this.editorState = new EditorState(
      this.editorState.text,
      clipboard,
      this.editorState.selectedText,
      this.editorState.cursorPosition,
      this.editorState.mouseKeyPosition
    );
  }

  getClipboard() {
    return this.editorState.clipboard;
  }

  insert(text: string, cursorPosition: number) {
    const editorText = this.editorState.text;

    const newText =
      editorText.slice(0, cursorPosition) +
      text +
      editorText.slice(cursorPosition);

    this.editorState = new EditorState(
      newText,
      this.editorState.clipboard,
      this.editorState.selectedText,
      this.editorState.cursorPosition,
      this.editorState.mouseKeyPosition
    );
  }

  replace(oldText: string, newText: string, cursorPosition: number) {
    const editorText = this.editorState.text;

    const replacedText =
      editorText.slice(0, cursorPosition) +
      newText +
      editorText.slice(cursorPosition + oldText.length);

    this.editorState = new EditorState(
      replacedText,
      this.editorState.clipboard,
      this.editorState.selectedText,
      this.editorState.cursorPosition,
      this.editorState.mouseKeyPosition
    );
  }

  delete(cursorPosition: number, length: number) {
    const editorText = this.editorState.text;

    const newText =
      editorText.slice(0, cursorPosition) +
      editorText.slice(cursorPosition + length);

    this.editorState = new EditorState(
      newText,
      this.editorState.clipboard,
      this.editorState.selectedText,
      this.editorState.cursorPosition,
      this.editorState.mouseKeyPosition
    );
  }

  createSnapshot() {
    const snapshot = new EditorState(
      this.editorState.text,
      this.editorState.clipboard,
      this.editorState.selectedText,
      this.editorState.cursorPosition,
      this.editorState.mouseKeyPosition
    );

    return snapshot;
  }

  restore(editorState: EditorState) {
    this.editorState = editorState;
  }
}

// Sender/Invoker
type MouseClickCallback = (cursorPosition: number) => Command;
type MouseKeyDownUpCallback = (cursorPosition: number) => Command;
type KeyPressCallback = (keyEventArg: KeyEventArg) => Command;

class ContextMenu {
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

class Shortcut {
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

    command.execute();
  }

  mouseClick(cursorPosition: number) {
    const command = this.onMouseClickCallback(cursorPosition);

    command.execute();
  }

  mouseKeyDown(cursorPosition: number) {
    const command = this.onMouseKeyDownCallback(cursorPosition);

    command.execute();
  }

  mouseKeyUp(cursorPosition: number) {
    const command = this.onMouseKeyUpCallback(cursorPosition);

    command.execute();
  }

  selectText(fromPosition: number, toPosition: number) {
    this.mouseKeyDown(fromPosition);

    this.mouseKeyUp(toPosition);
  }

  clickContextMenu(menu: string) {
    this.contextMenu.click(menu);
  }

  keyPressShortcut(shortcutKeys: ShortCutKeys) {
    const keyEventArg = KeyEventArg.toKeyEventArg(shortcutKeys);

    this.shortcut.keyPress(keyEventArg);
  }

  print() {
    console.log(this.textEditor.getText());
  }
}

// Command
class CopyCommand implements Command {
  private readonly textEditor: TextEditor;
  private readonly selectedText: string;
  private readonly textEditorState: EditorState;

  constructor(textEditor: TextEditor, selectedText: string) {
    this.textEditor = textEditor;
    this.selectedText = selectedText;
    this.textEditorState = this.textEditor.createSnapshot();
  }

  execute(): void {
    this.textEditor.setClipboard(this.selectedText);
  }

  undo(): void {
    this.textEditor.restore(this.textEditorState);
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
  private readonly textEditorState: EditorState;

  constructor(
    textEditor: TextEditor,
    selectedText: string,
    cursorPosition: number
  ) {
    this.textEditor = textEditor;
    this.selectedText = selectedText;
    this.cursorPosition = cursorPosition;
    this.textEditorState = this.textEditor.createSnapshot();
  }

  execute(): void {
    if (this.selectedText) {
      this.textEditor.setClipboard(this.selectedText);
      this.textEditor.delete(this.cursorPosition, this.selectedText.length);
    }
  }

  undo(): void {
    this.textEditor.restore(this.textEditorState);
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
  private readonly textEditorState: EditorState;

  constructor(
    textEditor: TextEditor,
    clipboard: string,
    cursorPosition: number
  ) {
    this.textEditor = textEditor;
    this.clipboard = clipboard;
    this.cursorPosition = cursorPosition;
    this.textEditorState = this.textEditor.createSnapshot();
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
    this.textEditor.restore(this.textEditorState);
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
  private readonly textEditorState: EditorState;

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
    this.textEditorState = this.textEditor.createSnapshot();
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
    this.textEditor.restore(this.textEditorState);
  }

  redo(): void {
    this.execute();
  }
}

// Command
class MouseClickedCommand implements Command {
  private readonly textEditor: TextEditor;
  private readonly cursorPosition: number = -1;
  private readonly textEditorState: EditorState;

  constructor(textEditor: TextEditor, cursorPosition: number) {
    this.textEditor = textEditor;
    this.cursorPosition = cursorPosition;
    this.textEditorState = this.textEditor.createSnapshot();
  }

  execute(): void {
    if (this.cursorPosition >= 0) {
      this.textEditor.setCursorPosition(this.cursorPosition);
      this.textEditor.setMouseKeyPosition("click");
    }
  }

  undo(): void {
    this.textEditor.restore(this.textEditorState);
  }

  redo(): void {
    this.execute();
  }
}

// Command
class MouseKeyDownCommand implements Command {
  private readonly textEditor: TextEditor;
  private readonly cursorPosition: number = -1;
  private readonly textEditorState: EditorState;

  constructor(textEditor: TextEditor, cursorPosition: number) {
    this.textEditor = textEditor;
    this.cursorPosition = cursorPosition;
    this.textEditorState = this.textEditor.createSnapshot();
  }

  execute(): void {
    if (this.cursorPosition >= 0) {
      this.textEditor.setCursorPosition(this.cursorPosition);
      this.textEditor.setMouseKeyPosition("down");
    }
  }

  undo(): void {
    this.textEditor.restore(this.textEditorState);
  }

  redo(): void {
    this.execute();
  }
}

// Command
class MouseKeyUpCommand implements Command {
  private readonly textEditor: TextEditor;
  private readonly cursorPosition: number = -1;
  private readonly textEditorState: EditorState;

  constructor(textEditor: TextEditor, cursorPosition: number) {
    this.textEditor = textEditor;
    this.cursorPosition = cursorPosition;
    this.textEditorState = this.textEditor.createSnapshot();
  }

  execute(): void {
    if (this.cursorPosition >= 0) {
      if (this.textEditorState.mouseKeyPosition === "down") {
        const text = this.textEditor.getText();

        const selectedText = text.substring(
          this.textEditorState.cursorPosition,
          this.cursorPosition
        );

        this.textEditor.setSelectedText(selectedText);
      }

      // this.textEditor.setCursorPosition(this.cursorPosition);
      this.textEditor.setMouseKeyPosition("up");
    }
  }

  undo(): void {
    this.textEditor.restore(this.textEditorState);
  }

  redo(): void {
    this.execute();
  }
}

// Command
class UndoCommand implements Command {
  private readonly commandHistory: CommandHistory;

  constructor(commandHistory: CommandHistory) {
    this.commandHistory = commandHistory;
  }

  execute(): void {
    this.commandHistory.undo();
  }

  undo(): void {
    // this.commandHistory.redo();
  }

  redo(): void {
    // this.execute();
  }
}

// Command
class RedoCommand implements Command {
  private readonly commandHistory: CommandHistory;

  constructor(commandHistory: CommandHistory) {
    this.commandHistory = commandHistory;
  }

  execute(): void {
    this.commandHistory.redo();
  }
  undo(): void {
    // this.commandHistory.undo();
  }
  redo(): void {
    // this.execute();
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
  getUndoCommand(): Command;
  getRedoCommand(): Command;
}

class KenanTextEditorCommandFactory implements TextEditorCommandFactory {
  private readonly textEditor: TextEditor;
  private readonly commandHistory: CommandHistory;

  constructor(textEditor: TextEditor, commandHistory: CommandHistory) {
    this.textEditor = textEditor;
    this.commandHistory = commandHistory;
  }

  getCopyCommand(): Command {
    const selectedText = this.textEditor.getSelectedText();

    const command: Command = new CopyCommand(this.textEditor, selectedText);

    this.commandHistory.save(command);

    return command;
  }

  getCutCommand(): Command {
    const selectedText = this.textEditor.getSelectedText();
    const cursorPosition = this.textEditor.getCursorPosition();

    const command: Command = new CutCommand(
      this.textEditor,
      selectedText,
      cursorPosition
    );

    this.commandHistory.save(command);

    return command;
  }

  getPasteCommand(): Command {
    const clipboard = this.textEditor.getClipboard();
    const cursorPosition = this.textEditor.getCursorPosition();

    const command: Command = new PasteCommand(
      this.textEditor,
      clipboard,
      cursorPosition
    );

    this.commandHistory.save(command);

    return command;
  }

  getKeyPressedCommand(keyEventArg: KeyEventArg): Command {
    const text = this.textEditor.getText();

    const command: Command = new KeyPressedCommand(
      this.textEditor,
      text,
      keyEventArg
    );

    this.commandHistory.save(command);

    return command;
  }

  getMouseClickCommand(cursorPosition: number): Command {
    const command: Command = new MouseClickedCommand(
      this.textEditor,
      cursorPosition
    );

    this.commandHistory.save(command);

    return command;
  }

  getMouseKeyDownCommand(cursorPosition: number): Command {
    const command: Command = new MouseKeyDownCommand(
      this.textEditor,
      cursorPosition
    );

    this.commandHistory.save(command);

    return command;
  }

  getMouseKeyUpCommand(cursorPosition: number): Command {
    const command: Command = new MouseKeyUpCommand(
      this.textEditor,
      cursorPosition
    );

    this.commandHistory.save(command);

    return command;
  }

  getUndoCommand(): Command {
    const command: Command = new UndoCommand(this.commandHistory);

    // this.commandHistory.save(command);

    return command;
  }

  getRedoCommand(): Command {
    const command: Command = new RedoCommand(this.commandHistory);

    // this.commandHistory.save(command);

    return command;
  }
}

// Client
class ClientCommand {
  static main() {
    const textEditor: TextEditor = new TextEditorApplication();

    const commandHistory = new CommandHistory();

    const textEditorCommandFactory: TextEditorCommandFactory =
      new KenanTextEditorCommandFactory(textEditor, commandHistory);

    const contextMenu = new ContextMenu();

    contextMenu.addMenu(
      "copy",
      textEditorCommandFactory.getCopyCommand.bind(textEditorCommandFactory)
    );

    contextMenu.addMenu(
      "cut",
      textEditorCommandFactory.getCutCommand.bind(textEditorCommandFactory)
    );

    contextMenu.addMenu(
      "paste",
      textEditorCommandFactory.getPasteCommand.bind(textEditorCommandFactory)
    );

    contextMenu.addMenu(
      "undo",
      textEditorCommandFactory.getUndoCommand.bind(textEditorCommandFactory)
    );

    contextMenu.addMenu(
      "redo",
      textEditorCommandFactory.getRedoCommand.bind(textEditorCommandFactory)
    );

    const shortcut = new Shortcut();

    shortcut.addShortcutKey(
      "CTRL+C",
      textEditorCommandFactory.getCopyCommand.bind(textEditorCommandFactory)
    );

    shortcut.addShortcutKey(
      "CTRL+X",
      textEditorCommandFactory.getCutCommand.bind(textEditorCommandFactory)
    );

    shortcut.addShortcutKey(
      "CTRL+V",
      textEditorCommandFactory.getPasteCommand.bind(textEditorCommandFactory)
    );

    shortcut.addShortcutKey(
      "CTRL+Z",
      textEditorCommandFactory.getUndoCommand.bind(textEditorCommandFactory)
    );

    shortcut.addShortcutKey(
      "CTRL+SHIFT+Z",
      textEditorCommandFactory.getRedoCommand.bind(textEditorCommandFactory)
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

    ui.keyPress("H");

    ui.clickContextMenu("undo");

    ui.keyPressShortcut("CTRL+Z"); // Undo

    ui.keyPressShortcut("CTRL+Z"); // Undo

    ui.keyPressShortcut("CTRL+Z"); // Undo

    ui.keyPressShortcut("CTRL+Z"); // Undo

    ui.keyPressShortcut("CTRL+SHIFT+Z"); // Redo

    ui.keyPressShortcut("CTRL+SHIFT+Z"); // Redo

    ui.keyPressShortcut("CTRL+SHIFT+Z"); // Redo

    ui.keyPressShortcut("CTRL+SHIFT+Z"); // Redo

    ui.clickContextMenu("redo");

    // ui.keyPress("i");

    ui.print();
  }
}

ClientCommand.main();

export {};
