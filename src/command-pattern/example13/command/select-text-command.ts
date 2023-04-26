import { TextEditor } from "../receiver";
import { Command } from "./command";

export class SelectTextCommand implements Command {
  private readonly textEditor: TextEditor;
  private readonly startPosition: number;
  private readonly endPosition: number;

  constructor(
    textEditor: TextEditor,
    startPosition: number,
    endPosition: number
  ) {
    this.textEditor = textEditor;
    this.startPosition = startPosition;
    this.endPosition = endPosition;
  }

  execute(): void {
    const text = this.textEditor.text;

    const selectedText = text.substring(this.startPosition, this.endPosition);

    this.textEditor.setSelectedText(selectedText);
  }
}
