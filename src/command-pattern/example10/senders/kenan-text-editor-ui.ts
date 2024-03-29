import {
  ASCII_PRINTABLE_KEYS,
  KeyEventArg,
  KeyPressCallback,
  MouseClickCallback,
  MouseKeyDownUpCallback,
  ShortCutKeys,
  TopMenu,
} from ".";
import { TextEditor } from "../receiver";
import { ContextMenu } from "./context-menu";
import { Shortcut } from "./shortcut";
import { TextEditorUI } from "./text-editor-ui";

// Sender/Invoker
export class KenanTextEditorUI implements TextEditorUI {
  private readonly textEditor: TextEditor;
  private readonly topMenu: TopMenu;
  private readonly contextMenu: ContextMenu;
  private readonly shortcut: Shortcut;
  private readonly onKeyPressCallback: KeyPressCallback;
  private readonly onMouseClickCallback: MouseClickCallback;
  private readonly onMouseKeyDownCallback: MouseKeyDownUpCallback;
  private readonly onMouseKeyUpCallback: MouseKeyDownUpCallback;

  constructor(
    textEditor: TextEditor,
    topMenu: TopMenu,
    contextMenu: ContextMenu,
    shortcut: Shortcut,
    onKeyPressCallback: KeyPressCallback,
    onMouseClickCallback: MouseClickCallback,
    onMouseKeyDownCallback: MouseKeyDownUpCallback,
    onMouseKeyUpCallback: MouseKeyDownUpCallback
  ) {
    this.textEditor = textEditor;
    this.topMenu = topMenu;
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
    console.log(this.textEditor.getText());
  }
}
