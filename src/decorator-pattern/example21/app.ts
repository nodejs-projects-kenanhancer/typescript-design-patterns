interface Text {
  format(text: string): string;
}

class SimpleText implements Text {
  format(text: string): string {
    return text;
  }
}

abstract class TextDecorator implements Text {
  protected readonly text: Text;

  constructor(text: Text) {
    this.text = text;
  }

  format(text: string): string {
    return this.text.format(text);
  }
}

class ToUpperCase extends TextDecorator {
  constructor(text: Text) {
    super(text);
  }

  format(text: string): string {
    return super.format(text).toUpperCase();
  }
}

class ToLowerCase extends TextDecorator {
  constructor(text: Text) {
    super(text);
  }

  format(text: string): string {
    return super.format(text).toLowerCase();
  }
}

class CamelCase extends TextDecorator {
  constructor(text: Text) {
    super(text);
  }

  format(text: string): string {
    return super
      .format(text)
      .split(" ")
      .reduce((acc, cv) => {
        return acc + cv.charAt(0).toUpperCase() + cv.slice(1);
      });
  }
}

class PascalCase extends TextDecorator {
  constructor(text: Text) {
    super(text);
  }

  format(text: string): string {
    return super
      .format(text)
      .split(" ")
      .reduce((acc, cv) => {
        return acc + cv.charAt(0).toUpperCase() + cv.slice(1);
      }, "");
  }
}

class GreetingConcat extends TextDecorator {
  constructor(text: Text) {
    super(text);
  }

  format(text: string): string {
    return super.format(text).concat("i am here");
  }
}

class SpaceConcat extends TextDecorator {
  constructor(text: Text) {
    super(text);
  }

  format(text: string): string {
    return super.format(text).concat(" ");
  }
}

class ReplaceHiWithHello extends TextDecorator {
  constructor(text: Text) {
    super(text);
  }

  format(text: string): string {
    return super.format(text).replace("hi", "hello");
  }
}

(function () {
  const text = new GreetingConcat(
    new SpaceConcat(new PascalCase(new ReplaceHiWithHello(new SimpleText())))
  );

  console.log(text.format("hi world!"));
})();

export {};
