import { Command } from "../command";
import { KeyEventArg } from "../sender";

// Factory
export interface TextEditorCommandFactory {
  getCopyCommand(): Command;
  getCutCommand(): Command;
  getPasteCommand(): Command;
  getKeyPressCommand(keyEventArg: KeyEventArg): Command;
  getMouseClickCommand(cursorPosition: number): Command;
  getMouseKeyDownCommand(cursorPosition: number): Command;
  getMouseKeyUpCommand(cursorPosition: number): Command;
  getUndoCommand(): Command;
  getRedoCommand(): Command;
}
