import { TextEditorUI } from "../senders";

export interface TextEditorUIFactory {
  getTextEditorUI(): TextEditorUI;
}
