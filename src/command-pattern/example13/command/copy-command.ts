import { TextEditor, TextEditorState } from "../receiver";
import { ReversibleCommand } from "./reversible-command";

export class CopyCommand implements ReversibleCommand {
  private readonly textEditor: TextEditor;
  private readonly text: string;
  private readonly textEditorSnapshot: TextEditorState;

  constructor(textEditor: TextEditor, text: string) {
    this.textEditor = textEditor;
    this.text = text;
    this.textEditorSnapshot = textEditor.createSnapshot();
  }

  execute(): void {
    if (this.text) {
      this.textEditor.setClipboard(this.text);
    }
  }

  undo(): void {
    this.textEditor.restore(this.textEditorSnapshot);
  }
}
