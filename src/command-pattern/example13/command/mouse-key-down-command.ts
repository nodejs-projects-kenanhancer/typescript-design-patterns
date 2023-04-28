import { TextEditor, TextEditorState } from "../receiver";
import { ReversibleCommand } from "./reversible-command";

export class MouseKeyDownCommand implements ReversibleCommand {
  private readonly textEditor: TextEditor;
  private readonly position: number;
  private readonly textEditorSnapshot: TextEditorState;

  constructor(textEditor: TextEditor, position: number) {
    this.textEditor = textEditor;
    this.position = position;
    this.textEditorSnapshot = textEditor.createSnapshot();
  }

  execute(): void {
    this.textEditor.setCursorPosition(this.position);
    this.textEditor.setMouseKeyPosition("down");
  }

  undo(): void {
    this.textEditor.restore(this.textEditorSnapshot);
  }
}
