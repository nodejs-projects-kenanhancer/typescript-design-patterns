import { TextEditorState } from "../memento";

export type MouseKeyPosition = "click" | "down" | "up";

// Receiver Contract
export interface TextEditor {
  getText(): string;
  setCursorPosition(position: number): void;
  getCursorPosition(): number;
  setMouseKeyPosition(position: MouseKeyPosition): void;
  getMouseKeyPosition(): MouseKeyPosition;
  setSelectedText(text: string): void;
  getSelectedText(): string;
  setClipboard(clipboard: string): void;
  getClipboard(): string;
  insert(text: string, cursorPosition: number): void;
  replace(oldText: string, newText: string, cursorPosition: number): void;
  delete(cursorPosition: number, length: number): void;
  createSnapshot(): TextEditorState;
  restore(editorState: TextEditorState): void;
}
