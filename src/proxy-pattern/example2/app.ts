interface Image {
  display(): void;
}

class RealImage implements Image {
  constructor(private readonly fileName: string) {
    this.loadFromDisk(fileName);
  }

  loadFromDisk(fileName: string) {
    console.log(`Loading ${fileName}`);
  }

  display(): void {
    console.log(`Displaying ${this.fileName}`);
  }
}

class ProxyImage implements Image {
  private readonly realImage: Image;

  constructor(fileName: string) {
    this.realImage = new RealImage(fileName);
  }

  display(): void {
    this.realImage.display();
  }
}

(function () {
  const image: Image = new ProxyImage("dog.png");

  image.display();
})();
