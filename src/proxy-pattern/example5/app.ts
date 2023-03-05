/* 

Suppose you have an image loader component in your application that loads and 
displays images from a remote server. Loading large images over the network can be slow, and
you don't want to block the UI thread while the images are being loaded.
To address this, you can use a Proxy to load the images asynchronously in the background.

In this scenario, you can define an interface that represents the image loader component,
and two classes that implement this interface

*/

interface Image {
  id: string;
  title: string;
  data: any;
}

interface ImageLoader {
  loadImage(path: string): Image | undefined;
}

class FileImageLoader implements ImageLoader {
  loadImage(path: string): Image | undefined {
    console.log(`Loading ${path} from disk`);

    return undefined;
  }
}

class NetworkImageLoader implements ImageLoader {
  loadImage(path: string): Image | undefined {
    console.log(`Loading ${path} from network`);

    return undefined;
  }
}

class FileImageLoaderProxy implements ImageLoader {
  private imageLoader!: ImageLoader;
  private cacheAll: Map<string, Image | undefined>;

  constructor() {
    this.cacheAll = new Map<string, Image>();
  }

  loadImage(path: string): Image | undefined {
    if (!this.imageLoader) {
      this.imageLoader = new FileImageLoader();
    }

    let image = this.cacheAll.get(path);

    if (!image) {
      image = this.imageLoader.loadImage(path);

      this.cacheAll.set(path, image);
    }

    return image;
  }
}

class NetworkImageLoaderProxy implements ImageLoader {
  private imageLoader!: ImageLoader;
  private cacheAll: Map<string, Image | undefined>;

  constructor() {
    this.cacheAll = new Map<string, Image | undefined>();
  }

  loadImage(path: string): Image | undefined {
    if (!this.imageLoader) {
      this.imageLoader = new NetworkImageLoader();
    }

    let image = this.cacheAll.get(path);

    if (!image) {
      image = this.imageLoader.loadImage(path);

      this.cacheAll.set(path, image);
    } else {
      console.log(`Retrieved image ${path} from cache`);
    }

    return image;
  }
}

(function () {
  const fileImageLoader = new FileImageLoaderProxy();

  const networkImageLoader = new NetworkImageLoaderProxy();

  // image will be loaded from file system
  const image1 = fileImageLoader.loadImage("/images/image1.png");

  // image will be loaded from cache
  const image2 = fileImageLoader.loadImage("/images/image1.png");

  // image will be loaded from network
  const image3 = networkImageLoader.loadImage("http://localhost/image2.png");

  // image will be loaded from cache
  const image4 = networkImageLoader.loadImage("http://localhost/image2.png");
})();

export {};
