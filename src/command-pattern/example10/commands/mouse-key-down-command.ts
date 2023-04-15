import { TextEditorStateHistory } from "../memento";
import { TextEditor } from "../receiver";
import { StatableCommand } from "./statable-command";

// Command
export class MouseKeyDownCommand extends StatableCommand {
  private readonly cursorPosition: number = -1;

  constructor(
    textEditor: TextEditor,
    textEditorStateHistory: TextEditorStateHistory,
    cursorPosition: number
  ) {
    super(textEditor, textEditorStateHistory);

    this.cursorPosition = cursorPosition;
  }

  execute(): void {
    if (this.cursorPosition >= 0) {
      this.textEditor.setCursorPosition(this.cursorPosition);
      this.textEditor.setMouseKeyPosition("down");

      super.execute();
    }
  }
}
