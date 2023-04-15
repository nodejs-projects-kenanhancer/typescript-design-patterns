import { TextEditorStateHistory } from "../memento";
import { Command } from "./command";

// Command
export class RedoCommand implements Command {
  private readonly textEditorStateHistory: TextEditorStateHistory;

  constructor(textEditorStateHistory: TextEditorStateHistory) {
    this.textEditorStateHistory = textEditorStateHistory;
  }

  execute(): void {
    this.textEditorStateHistory.redo();
  }
}
