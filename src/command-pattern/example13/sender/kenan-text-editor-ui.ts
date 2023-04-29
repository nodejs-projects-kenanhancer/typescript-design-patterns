import { ASCII_PRINTABLE_KEYS, KeyEventArg, ShortCutKeys, TopMenu } from ".";
import { TextEditorCommandFactory } from "../factory";
import { TextEditor } from "../receiver";
import { CommandManager } from "./command-manager";
import { ContextMenu } from "./context-menu";
import { Shortcut } from "./shortcut";
import { TextEditorUI } from "./text-editor-ui";

// Sender/Invoker
export class KenanTextEditorUI implements TextEditorUI {
  private readonly textEditor: TextEditor;
  private readonly commandManager: CommandManager;
  private readonly textEditorCommandFactory: TextEditorCommandFactory;
  private readonly topMenu: TopMenu;
  private readonly contextMenu: ContextMenu;
  private readonly shortcut: Shortcut;

  private constructor(
    textEditor: TextEditor,
    commandManager: CommandManager,
    textEditorCommandFactory: TextEditorCommandFactory,
    topMenu: TopMenu,
    contextMenu: ContextMenu,
    shortcut: Shortcut
  ) {
    this.textEditor = textEditor;
    this.commandManager = commandManager;
    this.textEditorCommandFactory = textEditorCommandFactory;
    this.topMenu = topMenu;
    this.contextMenu = contextMenu;
    this.shortcut = shortcut;
  }

  static createInstance(
    textEditor: TextEditor,
    commandManager: CommandManager,
    textEditorCommandFactory: TextEditorCommandFactory,
    topMenu: TopMenu,
    contextMenu: ContextMenu,
    shortcut: Shortcut
  ) {
    return new KenanTextEditorUI(
      textEditor,
      commandManager,
      textEditorCommandFactory,
      topMenu,
      contextMenu,
      shortcut
    );
  }

  keyPress(key: ASCII_PRINTABLE_KEYS) {
    const command = this.textEditorCommandFactory.getKeyPressCommand(
      KeyEventArg.createInstance(key)
    );

    this.commandManager.execute(command);
  }

  mouseClick(cursorPosition: number) {
    const command =
      this.textEditorCommandFactory.getMouseClickCommand(cursorPosition);

    this.commandManager.execute(command);
  }

  mouseKeyDown(cursorPosition: number) {
    const command =
      this.textEditorCommandFactory.getMouseKeyDownCommand(cursorPosition);

    this.commandManager.execute(command);
  }

  mouseKeyUp(cursorPosition: number) {
    const command =
      this.textEditorCommandFactory.getMouseKeyUpCommand(cursorPosition);

    this.commandManager.execute(command);
  }

  selectText(startCursorPosition: number, endCursorPosition: number) {
    this.mouseKeyDown(startCursorPosition);

    this.mouseKeyUp(endCursorPosition);
  }

  clickTopMenu(menu: string) {
    this.topMenu.click(menu);
  }

  clickContextMenu(menu: string) {
    this.contextMenu.click(menu);
  }

  keyPressShortcut(shortcutKeys: ShortCutKeys) {
    const keyEventArg = KeyEventArg.toKeyEventArg(shortcutKeys);

    this.shortcut.keyPress(keyEventArg);
  }

  print() {
    console.log(this.textEditor.text);
  }
}
