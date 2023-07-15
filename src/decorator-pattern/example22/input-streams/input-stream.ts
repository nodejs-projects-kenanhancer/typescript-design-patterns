// Function Overloading with Variadic Tuple Type Parameters
export type ReadOptions =
  | []
  | [buffer: Buffer]
  | [buffer: Buffer, offset: number, length: number, position: number | null];

export interface InputStream {
  readonly length: number;
  open(): Promise<void> | void;
  read(...arg: ReadOptions): Promise<number> | number;
  close(): Promise<void> | void;
}
