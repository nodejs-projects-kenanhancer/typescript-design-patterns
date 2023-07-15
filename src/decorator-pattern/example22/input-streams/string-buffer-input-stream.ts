import { InputStream, ReadOptions } from "./input-stream";

export class StringBufferInputStream implements InputStream {
  private readonly str: string;
  private strLength: number;
  private totalCharactersRead: number;
  private next: number;

  constructor(str: string) {
    this.str = str;
    this.strLength = str.length;
    this.next = 0;
  }

  get length() {
    return this.strLength - this.totalCharactersRead;
  }

  private validateNotNull() {
    if (!this.str) {
      throw new Error("Stream closed");
    }
  }

  open(): void | Promise<void> {}

  read(...arg: ReadOptions) {
    this.validateNotNull();

    const [buffer, offset, length, position = null] = arg;

    if (arg.length === 0) {
      if (this.next >= this.strLength) {
        return -1;
      }

      return this.str.charCodeAt(this.next++);
    }

    let bytesRead = 0;

    for (let i = this.next; i < this.next; i++) {
      buffer[this.next++] = this.str.charCodeAt(i);
    }

    return bytesRead;
  }

  close(): void | Promise<void> {}
}
