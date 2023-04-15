import { TextEditorStateHistory } from "../memento";
import { TextEditor } from "../receiver";
import { StatableCommand } from "./statable-command";

// Command
export class PasteCommand extends StatableCommand {
  private readonly clipboard: string;
  private readonly cursorPosition: number;

  constructor(
    textEditor: TextEditor,
    textEditorStateHistory: TextEditorStateHistory,
    clipboard: string,
    cursorPosition: number
  ) {
    super(textEditor, textEditorStateHistory);
    this.clipboard = clipboard;
    this.cursorPosition = cursorPosition;
  }

  execute(): void {
    if (this.clipboard && this.cursorPosition >= 0) {
      this.textEditor.insert(this.clipboard, this.cursorPosition);
      this.textEditor.setCursorPosition(
        this.cursorPosition + this.clipboard.length + 1
      );

      super.execute();
    }
  }
}
