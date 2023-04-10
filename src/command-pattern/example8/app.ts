interface Command {
  execute(): void;
}

// Receiver Contract
interface File {
  open(filePath: string): void;
  close(): void;
  save(): void;
  revert(): void;
}

abstract class BaseFile implements File {
  private readonly fileType: string;
  private filePath: string = "";

  constructor(fileType: string) {
    this.fileType = fileType;
  }

  open(filePath: string): void {
    this.filePath = filePath;

    console.log(this.fileType + " file is opened from " + filePath);
  }

  close(): void {
    console.log("File is closed");
  }

  save(): void {
    if (this.filePath) {
      console.log(this.fileType + " file is saved in " + this.filePath);
    }
  }

  revert(): void {
    console.log("File is reverted");
  }
}

// Receiver
class TxtDocument extends BaseFile {
  constructor() {
    super("txt");
  }
}

// Receiver
class CsvDocument extends BaseFile {
  constructor() {
    super("csv");
  }
}

// Receiver
class XmlDocument extends BaseFile {
  constructor() {
    super("xml");
  }
}

// Receiver
class JsonDocument extends BaseFile {
  constructor() {
    super("json");
  }
}

// Receiver
class Jpg extends BaseFile {
  constructor() {
    super("jpg");
  }
}

// Receiver
class Png extends BaseFile {
  constructor() {
    super("jpg");
  }
}

// Sender/Invoker
class Menu {
  private readonly command: Command;

  constructor(command: Command) {
    this.command = command;
  }

  click() {
    this.command.execute();
  }
}

// Command
class OpenFileCommand implements Command {
  private readonly file: File;
  private readonly filePath: string;

  constructor(file: File, filePath: string) {
    this.file = file;
    this.filePath = filePath;
  }

  execute(): void {
    this.file.open(this.filePath);
  }
}

// Command
class CloseFileCommand implements Command {
  private readonly file: File;

  constructor(file: File) {
    this.file = file;
  }

  execute(): void {
    this.file.close();
  }
}

// Command
class SaveFileCommand implements Command {
  private readonly file: File;

  constructor(file: File) {
    this.file = file;
  }

  execute(): void {
    this.file.save();
  }
}

// Command
class RevertFileCommand implements Command {
  private readonly file: File;

  constructor(file: File) {
    this.file = file;
  }

  execute(): void {
    this.file.revert();
  }
}

// Client
class CommandClient {
  static main() {
    const txtDocument: File = new TxtDocument();

    const csvDocument: File = new CsvDocument();

    const xmlDocument: File = new XmlDocument();

    const jsonDocument: File = new JsonDocument();

    const jpg: File = new Jpg();

    const png: File = new Png();

    CommandClient.test(txtDocument, "./names.txt");

    CommandClient.test(csvDocument, "./names.csv");

    CommandClient.test(xmlDocument, "./countries.xml");

    CommandClient.test(jsonDocument, "./cities.json");

    CommandClient.test(jpg, "./tree.jpg");

    CommandClient.test(png, "./table.png");
  }

  static test(file: File, filePath: string) {
    const openCommand: Command = new OpenFileCommand(file, filePath);

    const closeCommand: Command = new CloseFileCommand(file);

    const saveCommand: Command = new SaveFileCommand(file);

    const revertCommand: Command = new RevertFileCommand(file);

    const openMenu = new Menu(openCommand);

    const closeMenu = new Menu(closeCommand);

    const saveMenu = new Menu(saveCommand);

    const revertMenu = new Menu(revertCommand);

    openMenu.click();

    closeMenu.click();

    saveMenu.click();

    revertMenu.click();
  }
}

CommandClient.main();

export {};
