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
      .toLowerCase()
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
        return acc + cv.charAt(0).toUpperCase() + cv.slice(1).toLowerCase();
      }, "");
  }
}

class SnakeCase extends TextDecorator {
  constructor(text: Text) {
    super(text);
  }

  format(text: string): string {
    return super.format(text).toLowerCase().split(" ").join("_");
  }
}

class KebabCase extends TextDecorator {
  constructor(text: Text) {
    super(text);
  }

  format(text: string): string {
    return super.format(text).toLowerCase().split(" ").join("-");
  }
}

(function () {
  const text = new PascalCase(new SimpleText());

  console.log(text.format("Order details"));

  const text2 = new CamelCase(new SimpleText());

  console.log(text2.format("Offer details"));

  const text3 = new SnakeCase(new SimpleText());

  console.log(text3.format("Customer DETAILS"));

  const text4 = new KebabCase(new SimpleText());

  console.log(text4.format("Order Details"));
})();

export {};
