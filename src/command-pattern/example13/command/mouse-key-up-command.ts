import { TextEditor, TextEditorState } from "../receiver";
import { ReversibleCommand } from "./reversible-command";

export class MouseKeyUpCommand implements ReversibleCommand {
  private readonly textEditor: TextEditor;
  private readonly position: number;
  private readonly textEditorSnapshot: TextEditorState;

  constructor(textEditor: TextEditor, position: number) {
    this.textEditor = textEditor;
    this.position = position;
    this.textEditorSnapshot = textEditor.createSnapshot();
  }

  execute(): void {
    if (this.textEditor.mouseKeyPosition === "down") {
      const text = this.textEditor.text;

      const selectedText = text.substring(
        this.textEditor.cursorPosition,
        this.position
      );

      this.textEditor.setSelectedText(selectedText);
    }

    this.textEditor.setMouseKeyPosition("up");
  }

  undo(): void {
    this.textEditor.restore(this.textEditorSnapshot);
  }
}
