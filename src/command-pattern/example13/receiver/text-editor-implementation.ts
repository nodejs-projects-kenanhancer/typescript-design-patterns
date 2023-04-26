import { MouseKeyPosition, TextEditor } from "./text-editor";
import { TextEditorState } from "./text-editor-state";

export class TextEditorImplementation implements TextEditor {
  private textEditorState = TextEditorState.createInstance();

  get text() {
    return this.textEditorState.text;
  }

  get clipboard() {
    return this.textEditorState.clipboard;
  }

  get selectedText() {
    return this.textEditorState.selectedText;
  }

  get cursorPosition() {
    return this.textEditorState.cursorPosition;
  }

  get mouseKeyPosition() {
    return this.textEditorState.mouseKeyPosition;
  }

  setText(text: string) {
    this.textEditorState = TextEditorState.createInstanceFromState({
      ...this.textEditorState,
      text,
    });
  }

  setClipboard(clipboard: string) {
    this.textEditorState = TextEditorState.createInstanceFromState({
      ...this.textEditorState,
      clipboard,
    });
  }

  setSelectedText(selectedText: string) {
    this.textEditorState = TextEditorState.createInstanceFromState({
      ...this.textEditorState,
      selectedText,
    });
  }

  setCursorPosition(cursorPosition: number) {
    this.textEditorState = TextEditorState.createInstanceFromState({
      ...this.textEditorState,
      cursorPosition,
    });
  }

  setMouseKeyPosition(mouseKeyPosition: MouseKeyPosition) {
    this.textEditorState = TextEditorState.createInstanceFromState({
      ...this.textEditorState,
      mouseKeyPosition,
    });
  }

  insert(text: string, position: number) {
    const innerText = this.textEditorState.text;

    const newText =
      innerText.slice(0, position) + text + innerText.slice(position);

    this.textEditorState = TextEditorState.createInstanceFromState({
      ...this.textEditorState,
      text: newText,
    });
  }

  delete(position: number, length: number): void {
    const editorText = this.textEditorState.text;

    const newText =
      editorText.slice(0, position) + editorText.slice(position + length);

    this.textEditorState = TextEditorState.createInstanceFromState({
      ...this.textEditorState,
      text: newText,
    });
  }

  createSnapshot() {
    const snapshot = TextEditorState.createInstanceFromState(
      this.textEditorState
    );

    return snapshot;
  }

  restore(textEditorState: TextEditorState) {
    this.textEditorState = textEditorState;
  }
}
