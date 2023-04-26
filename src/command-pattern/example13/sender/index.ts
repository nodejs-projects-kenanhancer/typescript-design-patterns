import { Command } from "../command";
import { ASCII_CONTROL_KEYS, ASCII_UPPERCASE_ALPHABET_KEYS } from "./ascii";
import { KeyEventArg } from "./key-event-arg";

export type ShortCutKeys =
  | `${ASCII_CONTROL_KEYS}+${ASCII_UPPERCASE_ALPHABET_KEYS}`
  | `${ASCII_CONTROL_KEYS}+${ASCII_CONTROL_KEYS}+${ASCII_UPPERCASE_ALPHABET_KEYS}`;

export type MouseClickCallback = (cursorPosition: number) => Command;
export type MouseKeyDownUpCallback = (cursorPosition: number) => Command;
export type KeyPressCallback = (keyEventArg: KeyEventArg) => Command;

export * from "./ascii";
export * from "./command-history";
export * from "./command-manager";
export * from "./context-menu";
export * from "./kenan-text-editor-ui";
export * from "./key-event-arg";
export * from "./shortcut";
export * from "./text-editor-ui";
export * from "./top-menu";
