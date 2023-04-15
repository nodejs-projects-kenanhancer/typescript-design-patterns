import { TextEditorState, TextEditorStateHistory } from "../memento";
import { TextEditor } from "../receiver";
import { StatableCommand } from "./statable-command";

// Command
export class MouseKeyUpCommand extends StatableCommand {
  private readonly cursorPosition: number = -1;
  private readonly textEditorState: TextEditorState;

  constructor(
    textEditor: TextEditor,
    textEditorStateHistory: TextEditorStateHistory,
    cursorPosition: number
  ) {
    super(textEditor, textEditorStateHistory);

    this.textEditorState = this.textEditor.createSnapshot();

    this.cursorPosition = cursorPosition;
  }

  execute(): void {
    if (this.cursorPosition >= 0) {
      if (this.textEditorState.mouseKeyPosition === "down") {
        const text = this.textEditor.getText();

        const selectedText = text.substring(
          this.textEditorState.cursorPosition,
          this.cursorPosition
        );

        this.textEditor.setSelectedText(selectedText);
      }

      // this.textEditor.setCursorPosition(this.cursorPosition);
      this.textEditor.setMouseKeyPosition("up");

      super.execute();
    }
  }
}
