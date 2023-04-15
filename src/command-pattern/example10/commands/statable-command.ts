import { TextEditorStateHistory } from "../memento";
import { TextEditor } from "../receiver";
import { Command } from "./command";

export abstract class StatableCommand implements Command {
  protected readonly textEditor: TextEditor;
  protected readonly textEditorStateHistory: TextEditorStateHistory;

  constructor(
    textEditor: TextEditor,
    textEditorStateHistory: TextEditorStateHistory
  ) {
    this.textEditor = textEditor;
    this.textEditorStateHistory = textEditorStateHistory;
  }

  execute(): void {
    const snapshot = this.textEditor.createSnapshot();

    this.textEditorStateHistory.save(snapshot);
  }
}
