import { TextEditorState } from "./text-editor-state";

export type MouseKeyPosition = "click" | "down" | "up";

export interface TextEditor {
  readonly text: string;
  readonly clipboard: string;
  readonly selectedText: string;
  readonly cursorPosition: number;
  readonly mouseKeyPosition: MouseKeyPosition;
  setText(text: string): void;
  setClipboard(clipboard: string): void;
  setSelectedText(selectedText: string): void;
  setCursorPosition(cursorPosition: number): void;
  setMouseKeyPosition(position: MouseKeyPosition): void;
  insert(text: string, position: number): void;
  delete(position: number, length: number): void;
  createSnapshot(): TextEditorState;
  restore(textEditorState: TextEditorState): void;
}
