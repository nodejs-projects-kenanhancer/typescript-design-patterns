import { TextEditorState, TextEditor } from "../receiver";
import { ReversibleCommand } from "./reversible-command";

export class PasteCommand implements ReversibleCommand {
  private readonly textEditor: TextEditor;
  private readonly text: string;
  private readonly position: number;
  private readonly textEditorSnapshot: TextEditorState;

  constructor(textEditor: TextEditor, text: string, position: number) {
    this.textEditor = textEditor;
    this.text = text;
    this.position = position;
    this.textEditorSnapshot = textEditor.createSnapshot();
  }

  execute(): void {
    if (this.text && this.position >= 0) {
      this.textEditor.insert(this.text, this.position);
      this.textEditor.setCursorPosition(this.position + this.text.length + 1);
    }
  }

  undo(): void {
    if (this.text && this.position >= 0) {
      this.textEditor.restore(this.textEditorSnapshot);
    }
  }
}
