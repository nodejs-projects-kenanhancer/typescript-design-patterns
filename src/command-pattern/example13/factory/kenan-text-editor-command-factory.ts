import {
  Command,
  CopyCommand,
  CutCommand,
  KeyPressCommand,
  MouseClickCommand,
  MouseKeyDownCommand,
  MouseKeyUpCommand,
  PasteCommand,
  RedoCommand,
  UndoCommand,
} from "../command";
import { TextEditor } from "../receiver";
import { CommandManager, KeyEventArg } from "../sender";
import { TextEditorCommandFactory } from "./text-editor-command-factory";

export class KenanTextEditorCommandFactory implements TextEditorCommandFactory {
  private readonly textEditor: TextEditor;
  private readonly commandManager: CommandManager;

  private constructor(textEditor: TextEditor, commandManager: CommandManager) {
    this.textEditor = textEditor;
    this.commandManager = commandManager;
  }

  static createInstance(
    textEditor: TextEditor,
    commandManager: CommandManager
  ) {
    return new KenanTextEditorCommandFactory(textEditor, commandManager);
  }

  getCopyCommand(): Command {
    const command = new CopyCommand(
      this.textEditor,
      this.textEditor.selectedText
    );

    return command;
  }

  getCutCommand(): Command {
    const command = new CutCommand(
      this.textEditor,
      this.textEditor.selectedText,
      this.textEditor.cursorPosition
    );

    return command;
  }

  getPasteCommand(): Command {
    const command = new PasteCommand(
      this.textEditor,
      this.textEditor.clipboard,
      this.textEditor.cursorPosition
    );

    return command;
  }

  getKeyPressCommand(keyEventArg: KeyEventArg): Command {
    const command = new KeyPressCommand(
      this.textEditor,
      this.textEditor.text,
      keyEventArg
    );

    return command;
  }

  getMouseClickCommand(cursorPosition: number): Command {
    const command = new MouseClickCommand(this.textEditor, cursorPosition);

    return command;
  }

  getMouseKeyDownCommand(cursorPosition: number): Command {
    const command = new MouseKeyDownCommand(this.textEditor, cursorPosition);

    return command;
  }

  getMouseKeyUpCommand(cursorPosition: number): Command {
    const command = new MouseKeyUpCommand(this.textEditor, cursorPosition);

    return command;
  }

  getUndoCommand(): Command {
    const command = new UndoCommand(this.commandManager);

    return command;
  }

  getRedoCommand(): Command {
    const command = new RedoCommand(this.commandManager);

    return command;
  }
}
