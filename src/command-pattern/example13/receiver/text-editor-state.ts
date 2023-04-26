import { MouseKeyPosition } from "./text-editor";

export class TextEditorState {
  readonly text: string;
  readonly clipboard: string;
  readonly selectedText: string;
  readonly cursorPosition: number;
  readonly mouseKeyPosition: MouseKeyPosition;

  private constructor(
    text: string,
    clipboard: string,
    selectedText: string,
    cursorPosition: number,
    mouseKeyPosition: MouseKeyPosition
  ) {
    this.text = text;
    this.clipboard = clipboard;
    this.selectedText = selectedText;
    this.cursorPosition = cursorPosition;
    this.mouseKeyPosition = mouseKeyPosition;
  }

  static createInstance(
    text: string = "",
    clipboard: string = "",
    selectedText: string = "",
    cursorPosition: number = -1,
    mouseKeyPosition: MouseKeyPosition = "click"
  ) {
    return new TextEditorState(
      text,
      clipboard,
      selectedText,
      cursorPosition,
      mouseKeyPosition
    );
  }

  static createInstanceFromState({
    text,
    clipboard,
    selectedText,
    cursorPosition,
    mouseKeyPosition,
  }: TextEditorState) {
    return new TextEditorState(
      text,
      clipboard,
      selectedText,
      cursorPosition,
      mouseKeyPosition
    );
  }
}
