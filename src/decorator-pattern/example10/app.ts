interface Pizza {
  getPrice(): number;
  getDescription(): string;
}

class BasicPizza implements Pizza {
  getPrice(): number {
    return 4.99;
  }

  getDescription(): string {
    return "Pizza with tomato sauce and cheese";
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

class Cheese extends PizzaDecorator {
  constructor(pizza: Pizza) {
    super(pizza);
  }

  getPrice(): number {
    return super.getPrice() + 1.5;
  }

  getDescription(): string {
    return super.getDescription() + ", Cheese";
  }
}

class Pepperoni extends PizzaDecorator {
  constructor(pizza: Pizza) {
    super(pizza);
  }

  getPrice(): number {
    return super.getPrice() + 2.5;
  }

  getDescription(): string {
    return super.getDescription() + ", Pepperoni";
  }
}

class Mushrooms extends PizzaDecorator {
  constructor(pizza: Pizza) {
    super(pizza);
  }

  getPrice(): number {
    return super.getPrice() + 1;
  }

  getDescription(): string {
    return super.getDescription() + ", Mushrooms";
  }
}

class Olives extends PizzaDecorator {
  constructor(pizza: Pizza) {
    super(pizza);
  }

  getPrice(): number {
    return super.getPrice() + 0.5;
  }

  getDescription(): string {
    return super.getDescription() + ", Olives";
  }
}

(function () {
  const mixPizza = new Cheese(
    new Pepperoni(new Mushrooms(new Olives(new BasicPizza())))
  );

  console.log(mixPizza.getDescription() + ", costs " + mixPizza.getPrice());
})();

export {};
