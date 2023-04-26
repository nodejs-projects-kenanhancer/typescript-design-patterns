import { TextEditor } from "../receiver";
import { Command } from "./command";

export class CopyCommand implements Command {
  private readonly textEditor: TextEditor;
  private readonly text: string;

  constructor(textEditor: TextEditor, text: string) {
    this.textEditor = textEditor;
    this.text = text;
  }

  execute(): void {
    if (this.text) {
      this.textEditor.setClipboard(this.text);
    }
  }
}
