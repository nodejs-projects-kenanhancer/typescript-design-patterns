/*

suppose we want to add some functionality to RealImage such that 
it counts the number of times the image is displayed. 
We could modify the RealImage class directly, but this could potentially 
cause issues if the class is used in multiple places. 
Instead, we can use a proxy to add the new functionality without modifying the original class.

*/

interface Image {
  display(): void;
}

class RealImage implements Image {
  private readonly fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
    this.loadFromDisk();
  }

  private loadFromDisk() {
    console.log(`Loading ${this.fileName} from disk`);
  }

  display(): void {
    console.log(`Displaying ${this.fileName}`);
  }
}

class ProxyImage implements Image {
  private readonly fileName: string;
  private count: number;
  private realImage!: Image;

  constructor(fileName: string) {
    this.fileName = fileName;
    this.count = 0;
  }

  display(): void {
    if (!this.realImage) {
      this.realImage = new RealImage(this.fileName);
    }

    this.realImage.display();

    this.count++;

    console.log(`Image displayed ${this.count} times.`);
  }
}

(function () {
  const image: Image = new ProxyImage("dog.png");

  // image will be loaded from disk
  image.display();

  // image will be loaded from cache
  image.display();
})();

export {};
