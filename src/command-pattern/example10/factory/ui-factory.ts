import {
  ContextMenu,
  KenanTextEditorUI,
  KeyPressCallback,
  MouseClickCallback,
  MouseKeyDownUpCallback,
  Shortcut,
  TextEditorUI,
  TopMenu,
} from "../senders";
import { TextEditor } from "../receiver";
import { TextEditorCommandFactory } from "../factory";
import { TextEditorUIFactory } from "./text-editor-ui-factory";

export class UIFactory implements TextEditorUIFactory {
  private readonly textEditor: TextEditor;
  private readonly textEditorCommandFactory: TextEditorCommandFactory;

  constructor(
    textEditor: TextEditor,
    textEditorCommandFactory: TextEditorCommandFactory
  ) {
    this.textEditor = textEditor;
    this.textEditorCommandFactory = textEditorCommandFactory;
  }

  getTextEditorUI(): TextEditorUI {
    const topMenu = this.getTopMenu();

    const contextMenu = this.getContextMenu();

    const shortcut = this.getShortcut();

    const onKeyPressCallback: KeyPressCallback = (keyEventArg) => {
      return this.textEditorCommandFactory.getKeyPressCommand(keyEventArg);
    };

    const onMouseClickCallback: MouseClickCallback = (cursorPosition) => {
      return this.textEditorCommandFactory.getMouseClickCommand(cursorPosition);
    };

    const onMouseKeyDownCallback: MouseKeyDownUpCallback = (cursorPosition) => {
      return this.textEditorCommandFactory.getMouseKeyDownCommand(
        cursorPosition
      );
    };

    const onMouseKeyUpCallback: MouseKeyDownUpCallback = (cursorPosition) => {
      return this.textEditorCommandFactory.getMouseKeyUpCommand(cursorPosition);
    };

    const ui = new KenanTextEditorUI(
      this.textEditor,
      topMenu,
      contextMenu,
      shortcut,
      onKeyPressCallback,
      onMouseClickCallback,
      onMouseKeyDownCallback,
      onMouseKeyUpCallback
    );

    return ui;
  }

  private getContextMenu() {
    const contextMenu = new ContextMenu();

    contextMenu.addMenu(
      "copy",
      this.textEditorCommandFactory.getCopyCommand.bind(
        this.textEditorCommandFactory
      )
    );

    contextMenu.addMenu(
      "cut",
      this.textEditorCommandFactory.getCutCommand.bind(
        this.textEditorCommandFactory
      )
    );

    contextMenu.addMenu(
      "paste",
      this.textEditorCommandFactory.getPasteCommand.bind(
        this.textEditorCommandFactory
      )
    );

    return contextMenu;
  }

  private getTopMenu() {
    const topMenu = new TopMenu();

    topMenu.addMenu(
      "copy",
      this.textEditorCommandFactory.getCopyCommand.bind(
        this.textEditorCommandFactory
      )
    );

    topMenu.addMenu(
      "cut",
      this.textEditorCommandFactory.getCutCommand.bind(
        this.textEditorCommandFactory
      )
    );

    topMenu.addMenu(
      "paste",
      this.textEditorCommandFactory.getPasteCommand.bind(
        this.textEditorCommandFactory
      )
    );

    topMenu.addMenu(
      "undo",
      this.textEditorCommandFactory.getUndoCommand.bind(
        this.textEditorCommandFactory
      )
    );

    topMenu.addMenu(
      "redo",
      this.textEditorCommandFactory.getRedoCommand.bind(
        this.textEditorCommandFactory
      )
    );

    return topMenu;
  }

  private getShortcut() {
    const shortcut = new Shortcut();

    shortcut.addShortcutKey(
      "CTRL+C",
      this.textEditorCommandFactory.getCopyCommand.bind(
        this.textEditorCommandFactory
      )
    );

    shortcut.addShortcutKey(
      "CTRL+X",
      this.textEditorCommandFactory.getCutCommand.bind(
        this.textEditorCommandFactory
      )
    );

    shortcut.addShortcutKey(
      "CTRL+V",
      this.textEditorCommandFactory.getPasteCommand.bind(
        this.textEditorCommandFactory
      )
    );

    shortcut.addShortcutKey(
      "CTRL+Z",
      this.textEditorCommandFactory.getUndoCommand.bind(
        this.textEditorCommandFactory
      )
    );

    shortcut.addShortcutKey(
      "CTRL+SHIFT+Z",
      this.textEditorCommandFactory.getRedoCommand.bind(
        this.textEditorCommandFactory
      )
    );

    return shortcut;
  }
}
