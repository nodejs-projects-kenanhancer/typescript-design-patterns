/*

*/

abstract class LibraryItem {
  private _numCopies: number;

  get numCopies() {
    return this._numCopies;
  }

  set numCopies(value) {
    this._numCopies = value;
  }

  constructor() {
    this._numCopies = 0;
  }

  abstract display(): void;
}

class Book extends LibraryItem {
  private readonly author: string;
  private readonly title: string;

  constructor(author: string, title: string, numCopies: number) {
    super();
    this.author = author;
    this.title = title;
    this.numCopies = numCopies;
  }

  display(): void {
    console.log("Book ------ ");
    console.log(` Author: ${this.author}`);
    console.log(` Title: ${this.title}`);
    console.log(` # Copies: ${this.numCopies}`);
  }
}

class Video extends LibraryItem {
  private readonly director: string;
  private readonly title: string;
  private readonly playTime: number;

  constructor(
    director: string,
    title: string,
    playTime: number,
    numCopies: number
  ) {
    super();
    this.director = director;
    this.title = title;
    this.playTime = playTime;
    this.numCopies = numCopies;
  }

  display(): void {
    console.log("Video ----- ");
    console.log(` Director: ${this.director}`);
    console.log(` Title: ${this.title}`);
    console.log(` # Copies: ${this.numCopies}`);
    console.log(` Playtime: ${this.playTime}`);
  }
}

abstract class LibraryDecorator extends LibraryItem {
  private readonly libraryItem: LibraryItem;

  constructor(libraryItem: LibraryItem) {
    super();
    this.libraryItem = libraryItem;
  }

  display(): void {
    this.libraryItem.display();
  }
}

class Borrowable extends LibraryDecorator {
  private readonly borrowers: string[] = [];

  constructor(libraryItem: LibraryItem) {
    super(libraryItem);
  }

  borrowItem(name: string) {
    this.borrowers.push(name);
    this.numCopies--;
  }

  returnItem(name: string) {
    this.borrowers.slice();
    this.borrowers.splice(this.borrowers.indexOf(name), 1);
  }

  display(): void {
    super.display();

    for (const borrower of this.borrowers) {
      console.log(`borrower: ${borrower}`);
    }
  }
}

(function () {
  // Create book
  const book: LibraryItem = new Book("Worley", "Inside ASP.NET", 10);
  book.display();

  // Create video
  const video: LibraryItem = new Video("Spielberg", "Jaws", 23, 92);
  video.display();

  // Make video borrowable, then borrow and display
  console.log("\nMaking video borrowable:");

  const borrowvideo = new Borrowable(video);
  borrowvideo.borrowItem("Customer #1");
  borrowvideo.borrowItem("Customer #2");
  borrowvideo.display();
})();

export {};
