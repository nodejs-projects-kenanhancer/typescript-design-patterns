import { TextEditor } from "../receiver";
import { Command } from "./command";

export class MouseKeyUpCommand implements Command {
  private readonly textEditor: TextEditor;
  private readonly position: number;

  constructor(textEditor: TextEditor, position: number) {
    this.textEditor = textEditor;
    this.position = position;
  }

  execute(): void {
    if (this.textEditor.mouseKeyPosition === "down") {
      const text = this.textEditor.text;

      const selectedText = text.substring(
        this.textEditor.cursorPosition,
        this.position
      );

      this.textEditor.setSelectedText(selectedText);

      // new SelectTextCommand(
      //   this.textEditor,
      //   this.textEditor.cursorPosition,
      //   this.position
      // ).execute();
    }

    this.textEditor.setMouseKeyPosition("up");
  }
}
