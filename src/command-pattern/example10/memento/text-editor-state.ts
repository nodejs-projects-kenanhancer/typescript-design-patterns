import { MouseKeyPosition } from "../receiver";

// // Memento (Immutable State)
export class TextEditorState {
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
