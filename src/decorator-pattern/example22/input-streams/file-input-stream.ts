import * as fs from "fs";
import * as util from "util";
import { InputStream, ReadOptions } from "./input-stream";

// Convert fs.open and fs.read into Promise versions so they can be used with async/await
const open = util.promisify(fs.open);
const read = util.promisify(fs.read);
const close = util.promisify(fs.close);
const stat = util.promisify(fs.stat);

export class FileInputStream implements InputStream {
  private readonly filePath: string;
  private fileSize: number;
  private totalBytesRead: number;
  private fd?: number;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  get length() {
    return this.fileSize - this.totalBytesRead;
  }

  async open() {
    this.fd = await open(this.filePath, "r");

    this.fileSize = (await stat(this.filePath)).size;
  }

  async read(...arg: ReadOptions): Promise<number> {
    const [
      buffer = Buffer.alloc(1),
      offset = 0,
      length = buffer.length,
      position = null,
    ] = arg;

    const bytesRead = await read(this.fd, buffer, offset, length, position);

    if (bytesRead.bytesRead === 0) {
      // End of file
      return -1;
    }

    this.totalBytesRead += bytesRead.bytesRead;

    return arg.length === 0 ? buffer[0] : bytesRead.bytesRead;
  }

  async close() {
    if (this.fd) {
      await close(this.fd);
      this.fd = undefined;
    }
  }
}
