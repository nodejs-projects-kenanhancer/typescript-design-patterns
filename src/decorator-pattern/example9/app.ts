interface Pizza {
  getPrice(): number;
  getDescription(): string;
}

class Margherita implements Pizza {
  getPrice(): number {
    return 5;
  }

  getDescription(): string {
    return "Margherita";
  }
}

abstract class PizzaDecorator implements Pizza {
  private readonly pizza: Pizza;

  constructor(pizza: Pizza) {
    this.pizza = pizza;
  }

  getPrice(): number {
    return this.pizza.getPrice();
  }

  getDescription(): string {
    return this.pizza.getDescription();
  }
}

class ExtraCheese extends PizzaDecorator {
  constructor(pizza: Pizza) {
    super(pizza);
  }

  getPrice(): number {
    return super.getPrice() + 1.5;
  }

  getDescription(): string {
    return super.getDescription() + ", Extra Cheese";
  }
}

class Pepperoni extends PizzaDecorator {
  constructor(pizza: Pizza) {
    super(pizza);
  }

  getPrice(): number {
    return super.getPrice() + 2;
  }

  getDescription(): string {
    return super.getDescription() + ", Pepperoni";
  }
}

(function () {
  const mixPizza = new ExtraCheese(new Pepperoni(new Margherita()));

  console.log(mixPizza.getDescription() + ", costs " + mixPizza.getPrice());
})();

export {};
