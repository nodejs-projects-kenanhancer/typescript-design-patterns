import { TextEditor } from "../receiver";
import { Command } from "./command";

export class MouseKeyDownCommand implements Command {
  private readonly textEditor: TextEditor;
  private readonly position: number;

  constructor(textEditor: TextEditor, position: number) {
    this.textEditor = textEditor;
    this.position = position;
  }

  execute(): void {
    this.textEditor.setCursorPosition(this.position);
    this.textEditor.setMouseKeyPosition("down");
  }
}
