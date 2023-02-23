interface Image {
  display(): void;
}

class RealImage implements Image {
  constructor(private readonly fileName: string) {
    this.loadFromDisk(fileName);
  }

  loadFromDisk(fileName: string) {
    console.log(`Loading ${fileName} from disk`);
  }

  display(): void {
    console.log(`Displaying ${this.fileName}`);
  }
}

class ProxyImage implements Image {
  private realImage!: Image;

  constructor(public readonly fileName: string) {}

  display(): void {
    if (!this.realImage) {
      this.realImage = new RealImage(this.fileName);
    }

    this.realImage.display();
  }
}

(function () {
  const image: Image = new ProxyImage("dog.png");

  //image will be loaded from disk
  image.display();

  //image will not be loaded from disk
  image.display();
})();
