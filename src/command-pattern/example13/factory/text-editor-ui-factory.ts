import { TextEditorUI } from "../sender";

export interface TextEditorUIFactory {
  getTextEditorUI(): TextEditorUI;
}
