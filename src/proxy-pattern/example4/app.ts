/* 

Suppose you have a system that needs to access a remote file on a server.
Accessing the file over the network can be slow and unreliable, 
and you don't want to access the file directly every time you need it.
To address this, you can use a Proxy to cache the file locally and minimize network requests.

In this scenario, you can define a Proxy class that mimics the interface of the remote file.

The Proxy class can have a reference to the real file object, which it can create lazily upon first access.
The Proxy can then handle requests by either forwarding them to the real file object or by serving them from the local cache.

*/

interface IFileSystem {
  readFile(filePath: string): string;
}

class RemoteFileSystem implements IFileSystem {
  readFile(filePath: string): string {
    console.log(`Reading file from remote file system ${filePath}`);

    // simulate a long network operation

    return `Content of file: ${filePath}`;
  }
}

class RemoteFileSystemProxy implements IFileSystem {
  private fileSystem!: IFileSystem;
  private readonly cacheAll: Map<string, string>;

  constructor() {
    this.cacheAll = new Map<string, string>();
  }

  readFile(filePath: string): string {
    if (!this.fileSystem) {
      this.fileSystem = new RemoteFileSystem();
    }

    let content = this.cacheAll.get(filePath);

    if (!content) {
      content = this.fileSystem.readFile(filePath);

      this.cacheAll.set(filePath, content);
    }

    return content;
  }
}

(function () {
  const fileSystem: IFileSystem = new RemoteFileSystemProxy();

  const image1 = fileSystem.readFile("images/image1.png");

  const image2 = fileSystem.readFile("images/image2.png");
})();
