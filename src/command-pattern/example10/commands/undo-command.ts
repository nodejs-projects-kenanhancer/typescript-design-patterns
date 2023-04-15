import { TextEditorStateHistory } from "../memento";
import { TextEditor } from "../receiver";
import { Command } from "./command";

// Command
export class UndoCommand implements Command {
  private readonly textEditor: TextEditor;
  private readonly textEditorStateHistory: TextEditorStateHistory;

  constructor(
    textEditor: TextEditor,
    textEditorStateHistory: TextEditorStateHistory
  ) {
    this.textEditor = textEditor;
    this.textEditorStateHistory = textEditorStateHistory;
  }

  execute(): void {
    const textEditorState = this.textEditorStateHistory.undo();

    if (textEditorState) {
      this.textEditor.restore(textEditorState);
    }
  }
}
