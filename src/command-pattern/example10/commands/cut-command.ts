import { TextEditorStateHistory } from "../memento";
import { TextEditor } from "../receiver";
import { StatableCommand } from "./statable-command";

// Command
export class CutCommand extends StatableCommand {
  private readonly selectedText: string;
  private readonly cursorPosition: number;

  constructor(
    textEditor: TextEditor,
    textEditorStateHistory: TextEditorStateHistory,
    selectedText: string,
    cursorPosition: number
  ) {
    super(textEditor, textEditorStateHistory);
    this.selectedText = selectedText;
    this.cursorPosition = cursorPosition;
  }

  execute(): void {
    if (this.selectedText) {
      this.textEditor.setClipboard(this.selectedText);
      this.textEditor.delete(this.cursorPosition, this.selectedText.length);

      super.execute();
    }
  }
}
