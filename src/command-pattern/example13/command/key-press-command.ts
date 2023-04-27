import { TextEditor, TextEditorState } from "../receiver";
import { ASCII, KeyEventArg } from "../sender";
import { ReversibleCommand } from "./reversible-command";

// Command
export class KeyPressCommand implements ReversibleCommand {
  private readonly textEditor: TextEditor;
  private readonly keyEventArg: KeyEventArg;
  private readonly position: number = -1;
  private readonly textEditorSnapshot: TextEditorState;

  constructor(textEditor: TextEditor, keyEventArg: KeyEventArg) {
    this.textEditor = textEditor;

    this.keyEventArg = keyEventArg;

    const text = textEditor.text;

    const cursorPosition = textEditor.cursorPosition;

    if (cursorPosition >= 0) {
      this.position = cursorPosition + text.length + 1;
    } else {
      this.position = text.length + 1;
    }

    this.textEditorSnapshot = textEditor.createSnapshot();
  }

  execute(): void {
    const asciiRecord = ASCII[this.keyEventArg.KeyCode];

    if (asciiRecord) {
      const character = asciiRecord.symbol;

      if (character && this.position > 0) {
        this.textEditor.insert(character, this.position);
      }
    }
  }

  undo(): void {
    this.textEditor.restore(this.textEditorSnapshot);
  }
}
