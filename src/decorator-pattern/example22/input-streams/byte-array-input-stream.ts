import { InputStream, ReadOptions } from "./input-stream";

export class ByteArrayInputStream implements InputStream {
  private readonly data: string;
  private currentIndex: number;

  get length() {
    return 0;
  }

  constructor(data: string) {
    this.data = data;
    this.currentIndex = 0;
  }

  open() {}

  read(...arg: ReadOptions): number {
    const [
      buffer = Buffer.alloc(1),
      offset = this.currentIndex,
      length = buffer.length,
      position = null,
    ] = arg;

    const bytesRead = this.readBytes(buffer, offset, length, position);

    if (bytesRead === 0) {
      // End of file
      return -1;
    }

    return arg.length === 0 ? buffer[0] : bytesRead;
  }

  private readBytes(...arg: ReadOptions) {
    const [buffer, offset, length, position] = arg;

    let bytesRead = 0;
    for (let i = offset + this.currentIndex; bytesRead < offset + length; i++) {
      // buffer[i] = this.dataBuffer[i];
      buffer[bytesRead] = this.data.charCodeAt(i);
      bytesRead++;
      this.currentIndex++;
    }

    return bytesRead;
  }

  close() {}
}
