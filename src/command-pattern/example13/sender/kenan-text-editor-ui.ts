import { ASCII_PRINTABLE_KEYS, KeyEventArg, ShortCutKeys, TopMenu } from ".";
import {
  KeyPressCommand,
  MouseClickCommand,
  MouseKeyDownCommand,
  MouseKeyUpCommand,
} from "../command";
import { TextEditor } from "../receiver";
import { CommandManager } from "./command-manager";
import { ContextMenu } from "./context-menu";
import { Shortcut } from "./shortcut";
import { TextEditorUI } from "./text-editor-ui";

// Sender/Invoker
export class KenanTextEditorUI implements TextEditorUI {
  private readonly textEditor: TextEditor;
  private readonly topMenu: TopMenu;
  private readonly contextMenu: ContextMenu;
  private readonly shortcut: Shortcut;
  private readonly commandManager: CommandManager;

  private constructor(
    textEditor: TextEditor,
    commandManager: CommandManager,
    topMenu: TopMenu,
    contextMenu: ContextMenu,
    shortcut: Shortcut
  ) {
    this.textEditor = textEditor;
    this.commandManager = commandManager;
    this.topMenu = topMenu;
    this.contextMenu = contextMenu;
    this.shortcut = shortcut;
  }

  static createInstance(
    textEditor: TextEditor,
    commandManager: CommandManager,
    topMenu: TopMenu,
    contextMenu: ContextMenu,
    shortcut: Shortcut
  ) {
    return new KenanTextEditorUI(
      textEditor,
      commandManager,
      topMenu,
      contextMenu,
      shortcut
    );
  }

  keyPress(key: ASCII_PRINTABLE_KEYS) {
    const command = new KeyPressCommand(
      this.textEditor,
      this.textEditor.text,
      KeyEventArg.createInstance(key)
    );

    this.commandManager.execute(command);
  }

  mouseClick(cursorPosition: number) {
    const command = new MouseClickCommand(this.textEditor, cursorPosition);

    this.commandManager.execute(command);
  }

  mouseKeyDown(cursorPosition: number) {
    const command = new MouseKeyDownCommand(this.textEditor, cursorPosition);

    this.commandManager.execute(command);
  }

  mouseKeyUp(cursorPosition: number) {
    const command = new MouseKeyUpCommand(this.textEditor, cursorPosition);

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
