import { TextEditorStateHistory } from "../memento";
import { TextEditor } from "../receiver";
import { Command } from "./command";

// Command
export class RedoCommand implements Command {
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
    const textEditorState = this.textEditorStateHistory.redo();

    if (textEditorState) {
      this.textEditor.restore(textEditorState);
    }
  }
}
