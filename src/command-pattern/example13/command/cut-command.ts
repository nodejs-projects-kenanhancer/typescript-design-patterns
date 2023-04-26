import { TextEditorState, TextEditor } from "../receiver";
import { ReversibleCommand } from "./reversible-command";

export class CutCommand implements ReversibleCommand {
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
    if (this.text) {
      this.textEditor.setClipboard(this.text);
      this.textEditor.delete(this.position, this.text.length);
    }
  }

  undo(): void {
    if (this.text) {
      this.textEditor.restore(this.textEditorSnapshot);
    }
  }
}
