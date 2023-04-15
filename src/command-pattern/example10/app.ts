import {
  KenanTextEditorCommandFactory,
  TextEditorCommandFactory,
} from "./factory";
import {
  TextEditorStateHistory,
  TextEditorStateHistoryImplementation,
} from "./memento";
import {
  Shortcut,
  ContextMenu,
  CommandHistory,
  KeyPressCallback,
  KenanTextEditorUI,
  MouseClickCallback,
  MouseKeyDownUpCallback,
} from "./senders";
import { TextEditor, TextEditorApplication } from "./receiver";

// Client
class ClientCommand {
  static main() {
    const textEditor: TextEditor = new TextEditorApplication();

    const textEditorStateHistory: TextEditorStateHistory =
      new TextEditorStateHistoryImplementation();

    const commandHistory = new CommandHistory();

    const textEditorCommandFactory: TextEditorCommandFactory =
      new KenanTextEditorCommandFactory(
        textEditor,
        textEditorStateHistory,
        commandHistory
      );

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
      return textEditorCommandFactory.getKeyPressCommand(keyEventArg);
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
