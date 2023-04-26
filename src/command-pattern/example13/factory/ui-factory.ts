import { TextEditor } from "../receiver";
import {
  CommandManager,
  ContextMenu,
  KenanTextEditorUI,
  Shortcut,
  TextEditorUI,
  TopMenu,
} from "../sender";
import { TextEditorCommandFactory } from "./text-editor-command-factory";
import { TextEditorUIFactory } from "./text-editor-ui-factory";

export class UIFactory implements TextEditorUIFactory {
  private readonly textEditor: TextEditor;
  private readonly textEditorCommandFactory: TextEditorCommandFactory;
  private readonly commandManager: CommandManager;

  private constructor(
    textEditor: TextEditor,
    textEditorCommandFactory: TextEditorCommandFactory,
    commandManager: CommandManager
  ) {
    this.textEditor = textEditor;
    this.textEditorCommandFactory = textEditorCommandFactory;
    this.commandManager = commandManager;
  }

  static createInstance(
    textEditor: TextEditor,
    textEditorCommandFactory: TextEditorCommandFactory,
    commandManager: CommandManager
  ) {
    return new UIFactory(textEditor, textEditorCommandFactory, commandManager);
  }

  getTextEditorUI(): TextEditorUI {
    const topMenu = this.getTopMenu();

    const contextMenu = this.getContextMenu();

    const shortcut = this.getShortcut();

    const ui: TextEditorUI = KenanTextEditorUI.createInstance(
      this.textEditor,
      this.commandManager,
      topMenu,
      contextMenu,
      shortcut
    );

    return ui;
  }

  private getContextMenu() {
    const contextMenu = ContextMenu.createInstance(this.commandManager);

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
    const topMenu = TopMenu.createInstance(this.commandManager);

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
    const shortcut = Shortcut.createInstance(this.commandManager);

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
