interface InputStream {
  read(): number;
}

class FileInputStream implements InputStream {
  read(): number {
    throw new Error("Method not implemented.");
  }
}

class ByteArrayInputStream implements InputStream {
  read(): number {
    throw new Error("Method not implemented.");
  }
}

class StringBufferInputStream implements InputStream {
  read(): number {
    throw new Error("Method not implemented.");
  }
}

class ObjectInputStream implements InputStream {
  read(): number {
    throw new Error("Method not implemented.");
  }
}

class PipedInputStream implements InputStream {
  read(): number {
    throw new Error("Method not implemented.");
  }
}

class SequenceInputStream implements InputStream {
  read(): number {
    throw new Error("Method not implemented.");
  }
}

abstract class FilterInputStream implements InputStream {
  protected readonly inputStream: InputStream;

  constructor(inputStream: InputStream) {
    this.inputStream = inputStream;
  }
  read(): number {
    return this.inputStream.read();
  }
}

class DataInputStream extends FilterInputStream {
  constructor(inputStream: InputStream) {
    super(inputStream);
  }

  read(): number {
    throw new Error("Method not implemented.");
  }
}

class BufferedInputStream extends FilterInputStream {
  constructor(inputStream: InputStream) {
    super(inputStream);
  }

  read(): number {
    throw new Error("Method not implemented.");
  }
}

class LineNumberInputStream extends FilterInputStream {
  constructor(inputStream: InputStream) {
    super(inputStream);
  }

  read(): number {
    throw new Error("Method not implemented.");
  }
}

class PushbackInputStream extends FilterInputStream {
  constructor(inputStream: InputStream) {
    super(inputStream);
  }

  read(): number {
    throw new Error("Method not implemented.");
  }
}

export {};
