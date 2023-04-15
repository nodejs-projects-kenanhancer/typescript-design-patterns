import { TextEditorState } from "./text-editor-state";

// CareTaker contract
export interface TextEditorStateHistory {
  readonly currentState: TextEditorState;

  save(editorState: TextEditorState): void;

  undo(): TextEditorState | undefined;

  redo(): TextEditorState | undefined;
}
