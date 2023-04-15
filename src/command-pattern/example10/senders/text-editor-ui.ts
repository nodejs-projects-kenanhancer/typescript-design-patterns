import { ShortCutKeys } from ".";
import { ASCII_PRINTABLE_KEYS } from "./ascii";

// Sender/Invoker Contract
export interface TextEditorUI {
  keyPress(key: ASCII_PRINTABLE_KEYS): void;
  mouseClick(cursorPosition: number): void;
  mouseKeyDown(cursorPosition: number): void;
  mouseKeyUp(cursorPosition: number): void;
  selectText(fromPosition: number, toPosition: number): void;
  clickTopMenu(menu: string): void;
  clickContextMenu(menu: string): void;
  keyPressShortcut(shortcutKeys: ShortCutKeys): void;
  print(): void;
}
