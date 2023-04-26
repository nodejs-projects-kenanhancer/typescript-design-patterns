import { TextEditor, TextEditorState } from "../receiver";
import { NavigableCommand } from "./navigable-command";

export class MouseClickCommand implements NavigableCommand {
  private readonly textEditor: TextEditor;
  private readonly position: number;
  private readonly textEditorSnapshot: TextEditorState;

  constructor(textEditor: TextEditor, position: number) {
    this.textEditor = textEditor;
    this.position = position;
    this.textEditorSnapshot = textEditor.createSnapshot();
  }

  execute(): void {
    this.textEditor.setCursorPosition(this.position);
    this.textEditor.setMouseKeyPosition("click");
  }

  navigate(): void {
    this.textEditor.restore(this.textEditorSnapshot);
  }
}
