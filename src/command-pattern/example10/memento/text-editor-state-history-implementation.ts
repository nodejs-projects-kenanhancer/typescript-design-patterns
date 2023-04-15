import { TextEditorState } from "./text-editor-state";
import { TextEditorStateHistory } from "./text-editor-state-history";

// CareTaker
export class TextEditorStateHistoryImplementation
  implements TextEditorStateHistory
{
  private readonly snapshots: TextEditorState[] = [];
  private currentStateIndex: number = 0;

  get currentState() {
    return this.snapshots[this.currentStateIndex];
  }

  save(editorState: TextEditorState) {
    const index = this.snapshots.push(editorState);
    this.currentStateIndex = index - 1;
  }

  undo() {
    if (this.currentStateIndex >= 0) {
      this.currentStateIndex--;

      return this.snapshots[this.currentStateIndex];
    }
  }

  redo() {
    if (this.currentStateIndex < this.snapshots.length - 1) {
      this.currentStateIndex++;

      return this.snapshots[this.currentStateIndex];
    }
  }
}
