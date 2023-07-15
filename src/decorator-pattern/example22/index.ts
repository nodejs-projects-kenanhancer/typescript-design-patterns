import {
  FileInputStream,
  InputStream,
  StringBufferInputStream,
} from "./input-streams";

// import { FileInputStream } from "./input-stream/file-input-stream";

class DecoratorClient {
  static async main() {
    await DecoratorClient.testReadFileByteByByte();

    // await DecoratorClient.testReadFileFourByteByFourByte();

    // DecoratorClient.testReadStringByteByByte();

    // DecoratorClient.testReadStringFourByteByFourByte();
  }

  static async testReadFileByteByByte() {
    let fileStream: InputStream = null;

    try {
      fileStream = new FileInputStream("assets/input.txt");

      await fileStream.open();

      let byteRead: number;

      while ((byteRead = await fileStream.read()) > 0) {
        console.log(String.fromCharCode(byteRead));
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      try {
        if (fileStream != null) {
          // Close the input stream
          fileStream.close();
        }
      } catch (error: any) {
        console.error(error);
      }
    }
  }

  static async testReadFileFourByteByFourByte() {
    let fileStream: InputStream = null;

    try {
      fileStream = new FileInputStream("assets/input.txt");

      await fileStream.open();

      let bytesRead: number;

      const buffer = Buffer.alloc(4);

      while ((bytesRead = await fileStream.read(buffer, 0, 4, null)) > 0) {
        console.log(buffer.toString("utf-8"));
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      try {
        if (fileStream != null) {
          // Close the input stream
          fileStream.close();
        }
      } catch (error: any) {
        console.error(error);
      }
    }
  }

  static testReadStringByteByByte() {
    const data = "This is the text read from StringBufferInputStream.";

    try {
      const stringStream = new StringBufferInputStream(data);

      let byteRead: number;

      while ((byteRead = stringStream.read()) > 0) {
        console.log(String.fromCharCode(byteRead));
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  static testReadStringFourByteByFourByte() {
    // const data = "This is the text read from StringBufferInputStream.";
    const data = "This is.";

    try {
      const stringStream = new StringBufferInputStream(data);

      let bytesRead: number;

      const buffer = Buffer.alloc(4);

      while ((bytesRead = stringStream.read(buffer, 0, 4, null)) > 0) {
        console.log(buffer.toString("utf-8"));
      }
    } catch (error: any) {
      console.error(error);
    }
  }
}

DecoratorClient.main();
