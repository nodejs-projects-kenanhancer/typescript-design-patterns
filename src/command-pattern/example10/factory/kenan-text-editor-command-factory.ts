import {
  Command,
  CutCommand,
  UndoCommand,
  RedoCommand,
  CopyCommand,
  PasteCommand,
  KeyPressCommand,
  MouseClickCommand,
  MouseKeyUpCommand,
  MouseKeyDownCommand,
} from "../commands";
import { TextEditor } from "../receiver";
import { TextEditorStateHistory } from "../memento";
import { CommandHistory, KeyEventArg } from "../senders";
import { TextEditorCommandFactory } from "./text-editor-command-factory";

export class KenanTextEditorCommandFactory implements TextEditorCommandFactory {
  private readonly textEditor: TextEditor;
  private readonly textEditorStateHistory: TextEditorStateHistory;
  private readonly commandHistory: CommandHistory;

  constructor(
    textEditor: TextEditor,
    textEditorStateHistory: TextEditorStateHistory,
    commandHistory: CommandHistory
  ) {
    this.textEditor = textEditor;
    this.textEditorStateHistory = textEditorStateHistory;
    this.commandHistory = commandHistory;
  }

  getCopyCommand(): Command {
    const selectedText = this.textEditor.getSelectedText();

    const command: Command = new CopyCommand(
      this.textEditor,
      this.textEditorStateHistory,
      selectedText
    );

    this.commandHistory.save(command);

    return command;
  }

  getCutCommand(): Command {
    const selectedText = this.textEditor.getSelectedText();
    const cursorPosition = this.textEditor.getCursorPosition();

    const command: Command = new CutCommand(
      this.textEditor,
      this.textEditorStateHistory,
      selectedText,
      cursorPosition
    );

    this.commandHistory.save(command);

    return command;
  }

  getPasteCommand(): Command {
    const clipboard = this.textEditor.getClipboard();
    const cursorPosition = this.textEditor.getCursorPosition();

    const command: Command = new PasteCommand(
      this.textEditor,
      this.textEditorStateHistory,
      clipboard,
      cursorPosition
    );

    this.commandHistory.save(command);

    return command;
  }

  getKeyPressCommand(keyEventArg: KeyEventArg): Command {
    const text = this.textEditor.getText();

    const command: Command = new KeyPressCommand(
      this.textEditor,
      this.textEditorStateHistory,
      text,
      keyEventArg
    );

    this.commandHistory.save(command);

    return command;
  }

  getMouseClickCommand(cursorPosition: number): Command {
    const command: Command = new MouseClickCommand(
      this.textEditor,
      this.textEditorStateHistory,
      cursorPosition
    );

    this.commandHistory.save(command);

    return command;
  }

  getMouseKeyDownCommand(cursorPosition: number): Command {
    const command: Command = new MouseKeyDownCommand(
      this.textEditor,
      this.textEditorStateHistory,
      cursorPosition
    );

    this.commandHistory.save(command);

    return command;
  }

  getMouseKeyUpCommand(cursorPosition: number): Command {
    const command: Command = new MouseKeyUpCommand(
      this.textEditor,
      this.textEditorStateHistory,
      cursorPosition
    );

    this.commandHistory.save(command);

    return command;
  }

  getUndoCommand(): Command {
    const command: Command = new UndoCommand(this.textEditorStateHistory);

    this.commandHistory.save(command);

    return command;
  }

  getRedoCommand(): Command {
    const command: Command = new RedoCommand(this.textEditorStateHistory);

    this.commandHistory.save(command);

    return command;
  }
}
