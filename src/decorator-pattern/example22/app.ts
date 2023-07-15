// import * as fs from "fs";
// import * as util from "util";

// // Convert fs.open and fs.read into Promise versions so they can be used with async/await
// const open = util.promisify(fs.open);
// const read = util.promisify(fs.read);
// const close = util.promisify(fs.close);

// interface InputStream {
//   // reads a single byte from the file
//   read(): Promise<number | null>;
//   readAllBytes(): Uint8Array;
// }

// interface OutputStream {}

// class FileInputStream implements InputStream {
//   private readonly filePath: string;
//   private fd: number | undefined;

//   constructor(filePath: string) {
//     this.filePath = filePath;
//   }

//   async open() {
//     this.fd = await open(this.filePath, "r");

//     if (this.fd === undefined) {
//       throw new Error("File not opened");
//     }
//   }

//   async read(): Promise<number | null> {
//     const buffer = Buffer.alloc(1);
//     const bytesRead = await read(this.fd, buffer, 0, 1, null);

//     if (bytesRead.bytesRead === 0) {
//       // End of file
//       return null;
//     }

//     return buffer[0];
//   }

//   async close() {
//     if (this.fd !== undefined) {
//       await close(this.fd);
//       this.fd = undefined;
//     }
//   }

//   readAllBytes(): Uint8Array {
//     throw new Error("Method not implemented.");
//   }
// }

// class ByteArrayInputStream implements InputStream {
//   private readonly buf: Uint8Array;
//   private offset: number;
//   private readonly length: number;

//   constructor(buf: Uint8Array, offset: number = 0, length: number = 1) {
//     this.buf = buf;
//     this.offset = offset;
//     this.length = length;
//   }

//   read(): number {
//     const result = this.buf.at(this.offset++);

//     return result || -1;
//   }

//   readAllBytes(): Uint8Array {
//     return this.buf;
//   }
// }

// class StringBufferInputStream implements InputStream {
//   read(): number {
//     throw new Error("Method not implemented.");
//   }

//   readAllBytes(): Uint8Array {
//     throw new Error("Method not implemented.");
//   }
// }

// class ObjectInputStream implements InputStream {
//   read(): number {
//     throw new Error("Method not implemented.");
//   }

//   readAllBytes(): Uint8Array {
//     throw new Error("Method not implemented.");
//   }
// }

// class PipedInputStream implements InputStream {
//   read(): number {
//     throw new Error("Method not implemented.");
//   }

//   readAllBytes(): Uint8Array {
//     throw new Error("Method not implemented.");
//   }
// }

// class SequenceInputStream implements InputStream {
//   read(): number {
//     throw new Error("Method not implemented.");
//   }

//   readAllBytes(): Uint8Array {
//     throw new Error("Method not implemented.");
//   }
// }

// abstract class FilterInputStream implements InputStream {
//   protected readonly inputStream: InputStream;

//   constructor(inputStream: InputStream) {
//     this.inputStream = inputStream;
//   }
//   read(): number {
//     return this.inputStream.read();
//   }

//   readAllBytes(): Uint8Array {
//     return this.inputStream.readAllBytes();
//   }
// }

// class DataInputStream extends FilterInputStream {
//   constructor(inputStream: InputStream) {
//     super(inputStream);
//   }

//   read(): number {
//     throw new Error("Method not implemented.");
//   }

//   readAllBytes(): Uint8Array {
//     throw new Error("Method not implemented.");
//   }

//   readBoolean(): boolean {
//     throw new Error("Method not implemented.");
//   }

//   readInt(): number {
//     throw new Error("Method not implemented.");
//   }

//   readLine(): string {
//     throw new Error("Method not implemented.");
//   }
// }

// class BufferedInputStream extends FilterInputStream {
//   private readonly size?: number;

//   constructor(inputStream: InputStream, size?: number) {
//     super(inputStream);

//     this.size = size;
//   }

//   read(): number {
//     throw new Error("Method not implemented.");
//   }

//   readAllBytes(): Uint8Array {
//     throw new Error("Method not implemented.");
//   }
// }

// class LineNumberInputStream extends FilterInputStream {
//   constructor(inputStream: InputStream) {
//     super(inputStream);
//   }

//   read(): number {
//     throw new Error("Method not implemented.");
//   }

//   readAllBytes(): Uint8Array {
//     throw new Error("Method not implemented.");
//   }
// }

// class PushbackInputStream extends FilterInputStream {
//   constructor(inputStream: InputStream) {
//     super(inputStream);
//   }

//   read(): number {
//     throw new Error("Method not implemented.");
//   }

//   readAllBytes(): Uint8Array {
//     throw new Error("Method not implemented.");
//   }
// }

// (function () {
//   const originalString = "Hello World";

//   const encoder = new TextEncoder();

//   const stringByteArray = encoder.encode(originalString);

//   const str = String.fromCharCode(...stringByteArray);

//   console.log(str);
// })();

// (function () {
//   const originalString = "Hello World";

//   const encoder = new TextEncoder();

//   const stringByteArray = encoder.encode(originalString);

//   const inputStream = new ByteArrayInputStream(stringByteArray);

//   const str = String.fromCharCode(...inputStream.readAllBytes());

//   console.log(str);
// })();

// (function () {
//   const originalString = "Hello World";

//   const encoder = new TextEncoder();

//   const stringByteArray = encoder.encode(originalString);

//   const inputStream = new ByteArrayInputStream(stringByteArray);

//   let k = 0;
//   while ((k = inputStream.read()) !== -1) {
//     console.log(
//       "ASCII value of Character is:" +
//         k +
//         "; Special character is: " +
//         String.fromCharCode(k)
//     );
//   }
// })();

// (function () {
//   const dataInputStream = new DataInputStream(
//     new BufferedInputStream(new FileInputStream("myTextFile.txt"))
//   );

//   const v1 = dataInputStream.readInt();
//   const v2 = dataInputStream.readLine();
//   const v3 = dataInputStream.readBoolean();
// })();

// export {};
