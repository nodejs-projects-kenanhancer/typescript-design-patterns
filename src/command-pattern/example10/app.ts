import {
  KenanTextEditorCommandFactory,
  TextEditorCommandFactory,
  TextEditorUIFactory,
  UIFactory,
} from "./factory";
import {
  TextEditorStateHistory,
  TextEditorStateHistoryImplementation,
} from "./memento";
import { CommandHistory } from "./senders";
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

    const uiFactory: TextEditorUIFactory = new UIFactory(
      textEditor,
      textEditorCommandFactory
    );

    const ui = uiFactory.getTextEditorUI();

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

    ui.clickTopMenu("undo");

    ui.keyPressShortcut("CTRL+Z"); // Undo

    ui.keyPressShortcut("CTRL+Z"); // Undo

    ui.keyPressShortcut("CTRL+Z"); // Undo

    ui.keyPressShortcut("CTRL+Z"); // Undo

    ui.keyPressShortcut("CTRL+SHIFT+Z"); // Redo

    ui.keyPressShortcut("CTRL+SHIFT+Z"); // Redo

    ui.keyPressShortcut("CTRL+SHIFT+Z"); // Redo

    ui.keyPressShortcut("CTRL+SHIFT+Z"); // Redo

    ui.clickTopMenu("redo");

    // ui.keyPress("i");

    ui.print();
  }
}

ClientCommand.main();

export {};
