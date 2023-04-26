export const ASCII = {
  NULL: { symbol: undefined, ascii: 0, printable: false },
  START_OF_HEADING: { symbol: undefined, ascii: 1, printable: false },
  START_OF_TEXT: { symbol: undefined, ascii: 2, printable: false },
  END_OF_TEXT: { symbol: undefined, ascii: 3, printable: false },
  END_OF_TRANSMISSION: { symbol: undefined, ascii: 4, printable: false },
  ENQUIRY: { symbol: undefined, ascii: 5, printable: false },
  ACKNOWLEDGE: { symbol: undefined, ascii: 6, printable: false },
  BELL: { symbol: undefined, ascii: 7, printable: false },
  BACK_SPACE: { symbol: undefined, ascii: 8, printable: false },
  HORIZONTAL_TAB: { symbol: undefined, ascii: 9, printable: false },
  LINE_FEED: { symbol: undefined, ascii: 10, printable: false },
  VERTICAL_TAB: { symbol: undefined, ascii: 11, printable: false },
  FORM_FEED: { symbol: undefined, ascii: 12, printable: false },
  CARRIAGE_RETURN: { symbol: undefined, ascii: 13, printable: false },
  SHIFT_OUT: { symbol: undefined, ascii: 14, printable: false },
  SHIFT_IN: { symbol: undefined, ascii: 15, printable: false },
  DATA_LINK_ESCAPE: { symbol: undefined, ascii: 16, printable: false },
  DATA_CONTROL1: { symbol: undefined, ascii: 17, printable: false },
  DATA_CONTROL2: { symbol: undefined, ascii: 18, printable: false },
  DATA_CONTROL3: { symbol: undefined, ascii: 19, printable: false },
  DATA_CONTROL4: { symbol: undefined, ascii: 20, printable: false },
  NEGATIVE_ACKNOWLEDGE: { symbol: undefined, ascii: 21, printable: false },
  SYNCHRONOUS_IDLE: { symbol: undefined, ascii: 22, printable: false },
  END_OF_TRANS_BLOCK: { symbol: undefined, ascii: 23, printable: false },
  CANCEL: { symbol: undefined, ascii: 24, printable: false },
  END_OF_MEDIUM: { symbol: undefined, ascii: 25, printable: false },
  SUBSTITUTE: { symbol: undefined, ascii: 26, printable: false },
  ESCAPE: { symbol: undefined, ascii: 2, printable: false },
  FILE_SEPARATOR: { symbol: undefined, ascii: 28, printable: false },
  GROUP_SEPARATOR: { symbol: undefined, ascii: 29, printable: false },
  RECORD_SEPARATOR: { symbol: undefined, ascii: 30, printable: false },
  UNIT_SEPARATOR: { symbol: undefined, ascii: 31, printable: false },
  SPACE: { symbol: " ", ascii: 32, printable: true },

  EXCLAMATION: { symbol: "!", ascii: 33, printable: true },
  "!": { symbol: "!", ascii: 33, printable: true },
  DOUBLE_QUOTES: { symbol: '"', ascii: 34, printable: true },
  '"': { symbol: '"', ascii: 34, printable: true },
  NUMBER_SIGN: { symbol: "#", ascii: 35, printable: true },
  "#": { symbol: "#", ascii: 35, printable: true },
  DOLAR_SIGN: { symbol: "$", ascii: 36, printable: true },
  $: { symbol: "$", ascii: 36, printable: true },
  PER_CENT_SIGN: { symbol: "%", ascii: 37, printable: true },
  "%": { symbol: "%", ascii: 37, printable: true },
  AMPERSAND: { symbol: "&", ascii: 38, printable: true },
  "&": { symbol: "&", ascii: 38, printable: true },
  SINGLE_QUOTES: { symbol: "'", ascii: 39, printable: true },
  "'": { symbol: "'", ascii: 39, printable: true },
  OPEN_PARANTHESIS: { symbol: "(", ascii: 40, printable: true },
  "(": { symbol: "(", ascii: 40, printable: true },
  CLOSE_PARANTHESIS: { symbol: ")", ascii: 41, printable: true },
  ")": { symbol: ")", ascii: 41, printable: true },
  ASTERISK: { symbol: "*", ascii: 42, printable: true },
  "*": { symbol: "*", ascii: 42, printable: true },
  PLUS: { symbol: "+", ascii: 43, printable: true },
  "+": { symbol: "+", ascii: 43, printable: true },
  COMMA: { symbol: ",", ascii: 44, printable: true },
  ",": { symbol: ",", ascii: 44, printable: true },
  HYPHEN: { symbol: "-", ascii: 45, printable: true },
  "-": { symbol: "-", ascii: 45, printable: true },
  DOT: { symbol: ".", ascii: 46, printable: true },
  ".": { symbol: ".", ascii: 46, printable: true },
  SLASH_OR_DIVIDE: { symbol: "/", ascii: 47, printable: true },
  "/": { symbol: "/", ascii: 47, printable: true },

  ZERO: { symbol: "0", ascii: 48, printable: true },
  "0": { symbol: "0", ascii: 48, printable: true },
  ONE: { symbol: "1", ascii: 49, printable: true },
  "1": { symbol: "1", ascii: 49, printable: true },
  TWO: { symbol: "2", ascii: 50, printable: true },
  "2": { symbol: "2", ascii: 50, printable: true },
  THREE: { symbol: "3", ascii: 51, printable: true },
  "3": { symbol: "3", ascii: 51, printable: true },
  FOUR: { symbol: "4", ascii: 52, printable: true },
  "4": { symbol: "4", ascii: 52, printable: true },
  FIVE: { symbol: "5", ascii: 53, printable: true },
  "5": { symbol: "5", ascii: 53, printable: true },
  SIX: { symbol: "6", ascii: 54, printable: true },
  "6": { symbol: "6", ascii: 54, printable: true },
  SEVEN: { symbol: "7", ascii: 55, printable: true },
  "7": { symbol: "7", ascii: 55, printable: true },
  EIGHT: { symbol: "8", ascii: 56, printable: true },
  "8": { symbol: "8", ascii: 56, printable: true },
  NINE: { symbol: "9", ascii: 57, printable: true },
  "9": { symbol: "9", ascii: 57, printable: true },

  COLON: { symbol: ",", ascii: 58, printable: true },
  SEMI_COLON: { symbol: ";", ascii: 59, printable: true },
  ";": { symbol: ";", ascii: 59, printable: true },
  LESS_THAN: { symbol: "<", ascii: 60, printable: true },
  "<": { symbol: "<", ascii: 60, printable: true },
  EQUALS: { symbol: "=", ascii: 61, printable: true },
  "=": { symbol: "=", ascii: 61, printable: true },
  GREATER_THAN: { symbol: ">", ascii: 62, printable: true },
  ">": { symbol: ">", ascii: 62, printable: true },
  QUESTION_MARK: { symbol: "?", ascii: 63, printable: true },
  "?": { symbol: "?", ascii: 63, printable: true },
  AT_SIGN: { symbol: "@", ascii: 64, printable: true },
  "@": { symbol: "@", ascii: 64, printable: true },

  A: { symbol: "A", ascii: 65, printable: true, alphabet: true, uc: true },
  B: { symbol: "B", ascii: 66, printable: true, alphabet: true, uc: true },
  C: { symbol: "C", ascii: 67, printable: true, alphabet: true, uc: true },
  D: { symbol: "D", ascii: 68, printable: true, alphabet: true, uc: true },
  E: { symbol: "E", ascii: 69, printable: true, alphabet: true, uc: true },
  F: { symbol: "F", ascii: 70, printable: true, alphabet: true, uc: true },
  G: { symbol: "G", ascii: 71, printable: true, alphabet: true, uc: true },
  H: { symbol: "H", ascii: 72, printable: true, alphabet: true, uc: true },
  I: { symbol: "I", ascii: 73, printable: true, alphabet: true, uc: true },
  J: { symbol: "J", ascii: 74, printable: true, alphabet: true, uc: true },
  K: { symbol: "K", ascii: 75, printable: true, alphabet: true, uc: true },
  L: { symbol: "L", ascii: 76, printable: true, alphabet: true, uc: true },
  M: { symbol: "M", ascii: 77, printable: true, alphabet: true, uc: true },
  N: { symbol: "N", ascii: 78, printable: true, alphabet: true, uc: true },
  O: { symbol: "O", ascii: 79, printable: true, alphabet: true, uc: true },
  P: { symbol: "P", ascii: 80, printable: true, alphabet: true, uc: true },
  Q: { symbol: "Q", ascii: 81, printable: true, alphabet: true, uc: true },
  R: { symbol: "R", ascii: 82, printable: true, alphabet: true, uc: true },
  S: { symbol: "S", ascii: 83, printable: true, alphabet: true, uc: true },
  T: { symbol: "T", ascii: 84, printable: true, alphabet: true, uc: true },
  U: { symbol: "U", ascii: 85, printable: true, alphabet: true, uc: true },
  V: { symbol: "V", ascii: 86, printable: true, alphabet: true, uc: true },
  W: { symbol: "W", ascii: 87, printable: true, alphabet: true, uc: true },
  X: { symbol: "X", ascii: 88, printable: true, alphabet: true, uc: true },
  Y: { symbol: "Y", ascii: 89, printable: true, alphabet: true, uc: true },
  Z: { symbol: "Z", ascii: 90, printable: true, alphabet: true, uc: true },

  OPEN_BRACKET: { symbol: "[", ascii: 91, printable: true },
  "[": { symbol: "[", ascii: 91, printable: true },
  BACK_SLASH: { symbol: "\\", ascii: 92, printable: true },
  "\\": { symbol: "\\", ascii: 92, printable: true },
  CLOSE_BRACKET: { symbol: "]", ascii: 93, printable: true },
  "]": { symbol: "]", ascii: 93, printable: true },
  CARET: { symbol: "^", ascii: 94, printable: true },
  "^": { symbol: "^", ascii: 94, printable: true },
  UNDERSCORE: { symbol: "_", ascii: 95, printable: true },
  _: { symbol: "_", ascii: 95, printable: true },
  GRAVE_ACCENT: { symbol: "`", ascii: 96, printable: true },
  "`": { symbol: "`", ascii: 96, printable: true },

  a: { symbol: "a", ascii: 97, printable: true, alphabet: true, uc: false },
  b: { symbol: "b", ascii: 98, printable: true, alphabet: true, uc: false },
  c: { symbol: "c", ascii: 99, printable: true, alphabet: true, uc: false },
  d: { symbol: "d", ascii: 100, printable: true, alphabet: true, uc: false },
  e: { symbol: "e", ascii: 101, printable: true, alphabet: true, uc: false },
  f: { symbol: "f", ascii: 102, printable: true, alphabet: true, uc: false },
  g: { symbol: "g", ascii: 103, printable: true, alphabet: true, uc: false },
  h: { symbol: "h", ascii: 104, printable: true, alphabet: true, uc: false },
  i: { symbol: "i", ascii: 105, printable: true, alphabet: true, uc: false },
  j: { symbol: "j", ascii: 106, printable: true, alphabet: true, uc: false },
  k: { symbol: "k", ascii: 107, printable: true, alphabet: true, uc: false },
  l: { symbol: "l", ascii: 108, printable: true, alphabet: true, uc: false },
  m: { symbol: "m", ascii: 109, printable: true, alphabet: true, uc: false },
  n: { symbol: "n", ascii: 110, printable: true, alphabet: true, uc: false },
  o: { symbol: "o", ascii: 111, printable: true, alphabet: true, uc: false },
  p: { symbol: "p", ascii: 112, printable: true, alphabet: true, uc: false },
  q: { symbol: "q", ascii: 113, printable: true, alphabet: true, uc: false },
  r: { symbol: "r", ascii: 114, printable: true, alphabet: true, uc: false },
  s: { symbol: "s", ascii: 115, printable: true, alphabet: true, uc: false },
  t: { symbol: "t", ascii: 116, printable: true, alphabet: true, uc: false },
  u: { symbol: "u", ascii: 117, printable: true, alphabet: true, uc: false },
  v: { symbol: "v", ascii: 118, printable: true, alphabet: true, uc: false },
  w: { symbol: "w", ascii: 119, printable: true, alphabet: true, uc: false },
  x: { symbol: "x", ascii: 120, printable: true, alphabet: true, uc: false },
  y: { symbol: "y", ascii: 121, printable: true, alphabet: true, uc: false },
  z: { symbol: "z", ascii: 122, printable: true, alphabet: true, uc: false },

  OPEN_BRACE: { symbol: "{", ascii: 123, printable: true },
  "{": { symbol: "{", ascii: 123, printable: true },
  VERTICAL_BAR: { symbol: "|", ascii: 124, printable: true },
  "|": { symbol: "|", ascii: 124, printable: true },
  CLOSE_BRACE: { symbol: "}", ascii: 125, printable: true },
  "}": { symbol: "}", ascii: 125, printable: true },
  TILDE: { symbol: "~", ascii: 126, printable: true },
  "~": { symbol: "~", ascii: 126, printable: true },
  DEL: { symbol: undefined, ascii: 127, printable: false },

  SHIFT: { symbol: undefined, ascii: 128, printable: false }, // FAKE
  CTRL: { symbol: undefined, ascii: 129, printable: false }, // FAKE
  ALT: { symbol: undefined, ascii: 130, printable: false }, // FAKE
} as const;

export type ASCII_TYPE = typeof ASCII;

export type ASCII_KEYS = keyof ASCII_TYPE;

export type ASCII_CONTROL_KEYS = keyof {
  [P in keyof ASCII_TYPE as ASCII_TYPE[P]["printable"] extends false
    ? P
    : never]: ASCII_TYPE[P];
};

export type ASCII_PRINTABLE_KEYS = keyof {
  [P in keyof ASCII_TYPE as ASCII_TYPE[P]["printable"] extends true
    ? P
    : never]: ASCII_TYPE[P];
};

export type ASCII_ALPHABET_KEYS = keyof {
  [P in keyof ASCII_TYPE as ASCII_TYPE[P] extends { alphabet: boolean }
    ? ASCII_TYPE[P]["alphabet"] extends true
      ? P
      : never
    : never]: ASCII_TYPE[P];
};

export type ASCII_UPPERCASE_ALPHABET_KEYS = keyof {
  [P in keyof ASCII_TYPE as ASCII_TYPE[P] extends {
    alphabet: boolean;
    uc: boolean;
  }
    ? ASCII_TYPE[P]["alphabet"] extends true
      ? ASCII_TYPE[P]["uc"] extends true
        ? P
        : never
      : never
    : never]: ASCII_TYPE[P];
};
