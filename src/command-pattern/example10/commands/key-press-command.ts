import { TextEditorStateHistory } from "../memento";
import { TextEditor } from "../receiver";
import { ASCII, KeyEventArg } from "../senders";
import { StatableCommand } from "./statable-command";

// Command
export class KeyPressCommand extends StatableCommand {
  private readonly text;
  private readonly keyEventArg: KeyEventArg;
  private readonly position: number = -1;

  constructor(
    textEditor: TextEditor,
    textEditorStateHistory: TextEditorStateHistory,
    text: string,
    keyEventArg: KeyEventArg
  ) {
    super(textEditor, textEditorStateHistory);

    this.text = text;
    const cursorPosition = textEditor.getCursorPosition();

    if (cursorPosition >= 0) {
      this.position = cursorPosition + this.text.length + 1;
    } else {
      this.position = this.text.length + 1;
    }
    this.keyEventArg = keyEventArg;
  }

  execute(): void {
    const asciiRecord = ASCII[this.keyEventArg.KeyCode];

    if (asciiRecord) {
      const character = asciiRecord.symbol;

      if (character && this.position > 0) {
        this.textEditor.insert(character, this.position);
        super.execute();
      }
    }
  }
}
