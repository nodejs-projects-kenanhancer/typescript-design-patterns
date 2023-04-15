import { TextEditorStateHistory } from "../memento";
import { TextEditor } from "../receiver";
import { StatableCommand } from "./statable-command";

// Command
export class CopyCommand extends StatableCommand {
  private readonly selectedText: string;

  constructor(
    textEditor: TextEditor,
    textEditorStateHistory: TextEditorStateHistory,
    selectedText: string
  ) {
    super(textEditor, textEditorStateHistory);
    this.selectedText = selectedText;
  }

  execute(): void {
    this.textEditor.setClipboard(this.selectedText);

    super.execute();
  }
}
