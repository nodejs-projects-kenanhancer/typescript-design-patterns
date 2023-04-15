import { TextEditorState } from "../memento";
import { MouseKeyPosition, TextEditor } from "./text-editor";

// Receiver
export class TextEditorApplication implements TextEditor {
  private editorState: TextEditorState = new TextEditorState();

  getText() {
    return this.editorState.text;
  }

  setCursorPosition(cursorPosition: number) {
    this.editorState = new TextEditorState(
      this.editorState.text,
      this.editorState.clipboard,
      this.editorState.selectedText,
      cursorPosition,
      this.editorState.mouseKeyPosition
    );
  }

  getCursorPosition() {
    return this.editorState.cursorPosition;
  }

  setMouseKeyPosition(position: MouseKeyPosition): void {
    this.editorState = new TextEditorState(
      this.editorState.text,
      this.editorState.clipboard,
      this.editorState.selectedText,
      this.editorState.cursorPosition,
      position
    );
  }

  getMouseKeyPosition(): MouseKeyPosition {
    return this.editorState.mouseKeyPosition;
  }

  setSelectedText(text: string) {
    this.editorState = new TextEditorState(
      this.editorState.text,
      this.editorState.clipboard,
      text,
      this.editorState.cursorPosition,
      this.editorState.mouseKeyPosition
    );
  }

  getSelectedText() {
    return this.editorState.selectedText;
  }

  setClipboard(clipboard: string) {
    this.editorState = new TextEditorState(
      this.editorState.text,
      clipboard,
      this.editorState.selectedText,
      this.editorState.cursorPosition,
      this.editorState.mouseKeyPosition
    );
  }

  getClipboard() {
    return this.editorState.clipboard;
  }

  insert(text: string, cursorPosition: number) {
    const editorText = this.editorState.text;

    const newText =
      editorText.slice(0, cursorPosition) +
      text +
      editorText.slice(cursorPosition);

    this.editorState = new TextEditorState(
      newText,
      this.editorState.clipboard,
      this.editorState.selectedText,
      this.editorState.cursorPosition,
      this.editorState.mouseKeyPosition
    );
  }

  replace(oldText: string, newText: string, cursorPosition: number) {
    const editorText = this.editorState.text;

    const replacedText =
      editorText.slice(0, cursorPosition) +
      newText +
      editorText.slice(cursorPosition + oldText.length);

    this.editorState = new TextEditorState(
      replacedText,
      this.editorState.clipboard,
      this.editorState.selectedText,
      this.editorState.cursorPosition,
      this.editorState.mouseKeyPosition
    );
  }

  delete(cursorPosition: number, length: number) {
    const editorText = this.editorState.text;

    const newText =
      editorText.slice(0, cursorPosition) +
      editorText.slice(cursorPosition + length);

    this.editorState = new TextEditorState(
      newText,
      this.editorState.clipboard,
      this.editorState.selectedText,
      this.editorState.cursorPosition,
      this.editorState.mouseKeyPosition
    );
  }

  createSnapshot() {
    const snapshot = new TextEditorState(
      this.editorState.text,
      this.editorState.clipboard,
      this.editorState.selectedText,
      this.editorState.cursorPosition,
      this.editorState.mouseKeyPosition
    );

    return snapshot;
  }

  restore(editorState: TextEditorState) {
    this.editorState = editorState;
  }
}
