import {
  KenanTextEditorCommandFactory,
  TextEditorCommandFactory,
  TextEditorUIFactory,
  UIFactory,
} from "./factory";

import { TextEditor, TextEditorImplementation } from "./receiver";
import { CommandHistory, CommandManager } from "./sender";

// Client
class ClientCommand {
  static main() {
    const textEditor: TextEditor = new TextEditorImplementation();

    const commandManager: CommandManager = new CommandHistory();

    const textEditorCommandFactory: TextEditorCommandFactory =
      KenanTextEditorCommandFactory.createInstance(textEditor, commandManager);

    const uiFactory: TextEditorUIFactory = UIFactory.createInstance(
      textEditor,
      textEditorCommandFactory,
      commandManager
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

    ui.keyPressShortcut("CTRL+SHIFT+Z"); // Redo


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

export { };

