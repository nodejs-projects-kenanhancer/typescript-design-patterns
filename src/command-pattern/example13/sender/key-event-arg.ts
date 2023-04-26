import { ASCII_PRINTABLE_KEYS } from "./ascii";

export class KeyEventArg {
  readonly KeyCode: ASCII_PRINTABLE_KEYS;
  readonly Alt: boolean;
  readonly Control: boolean;
  readonly Shift: boolean;

  private constructor(
    keyCode: ASCII_PRINTABLE_KEYS,
    shift: boolean = false,
    alt: boolean = false,
    control: boolean = false
  ) {
    this.KeyCode = keyCode;
    this.Alt = alt;
    this.Control = control;
    this.Shift = shift;
  }

  toString() {
    return [
      ...((this.Control && ["CTRL"]) || []),
      ...((this.Alt && ["ALT"]) || []),
      ...((this.Shift && ["SHIFT"]) || []),
      this.KeyCode.toUpperCase(),
    ].join("+");
  }

  static createInstance(
    keyCode: ASCII_PRINTABLE_KEYS,
    shift: boolean = false,
    alt: boolean = false,
    control: boolean = false
  ) {
    return new KeyEventArg(keyCode, shift, alt, control);
  }

  static toKeyEventArg(keys: string) {
    const keyArray = keys.toLowerCase().split("+");

    if (keyArray.length === 0) {
      throw new Error("Keys length can be min 1");
    }

    if (keyArray.length > 4) {
      throw new Error("Keys length can be max 4");
    }

    const ctrl = keyArray.indexOf("ctrl");
    if (ctrl > -1) {
      keyArray.splice(ctrl, 1);
    }

    const shift = keyArray.indexOf("shift");
    if (shift > -1) {
      keyArray.splice(shift, 1);
    }

    const alt = keyArray.indexOf("alt");
    if (alt > -1) {
      keyArray.splice(alt, 1);
    }

    const key = keyArray.pop();

    if (key) {
      const keyEventArg = new KeyEventArg(
        key as ASCII_PRINTABLE_KEYS,
        shift > -1,
        alt > -1,
        ctrl > -1
      );

      return keyEventArg;
    }

    throw new Error("Not Validated");
  }
}
