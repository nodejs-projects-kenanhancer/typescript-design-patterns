interface Command {
  execute(): void;
}

type MouseKeyPosition = "click" | "down" | "up";

class TextEditorState {
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

interface TextEditor {
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

class TextEditorImplementation implements TextEditor {
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

// UndoCommand

class ClientCommand {
  static main() {}
}

ClientCommand.main();

export {};
