type CamelToSnake<T extends string, P extends string = ""> = string extends T
  ? string
  : T extends `${infer C0}${infer R}`
  ? CamelToSnake<
      R,
      `${P}${C0 extends Lowercase<C0> ? "" : "_"}${Lowercase<C0>}`
    >
  : P;

export type ToAction<T> = {
  [P in keyof T]-?: {
    type: `SET_${Uppercase<CamelToSnake<Extract<P, string>>>}`;
    value: T[Extract<P, string>];
  };
}[keyof T];
