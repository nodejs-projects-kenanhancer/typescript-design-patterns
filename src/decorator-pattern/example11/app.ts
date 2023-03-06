interface Coffee {
  getCost(): number;
  getDescription(): string;
}

class SimpleCoffee implements Coffee {
  getCost(): number {
    return 1;
  }

  getDescription(): string {
    return "Simple coffee";
  }
}

abstract class CoffeeDecorator implements Coffee {
  private readonly coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  getCost(): number {
    return this.coffee.getCost();
  }

  getDescription(): string {
    return this.coffee.getDescription();
  }
}

class Milk extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  getCost(): number {
    return super.getCost() + 0.5;
  }

  getDescription(): string {
    return super.getDescription() + ", milk";
  }
}

class Sugar extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  getCost(): number {
    return super.getCost() + 0.25;
  }

  getDescription(): string {
    return super.getDescription() + ", sugar";
  }
}

class Whip extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  getCost(): number {
    return super.getCost() + 5;
  }

  getDescription(): string {
    return super.getDescription() + ", whip";
  }
}

(function () {
  const expresso = new Sugar(new SimpleCoffee());

  console.log(expresso.getDescription() + ", costs " + expresso.getCost());

  const macchiato = new Sugar(new Milk(new Whip(new SimpleCoffee())));

  console.log(macchiato.getDescription() + ", costs " + macchiato.getCost());
})();

export {};
