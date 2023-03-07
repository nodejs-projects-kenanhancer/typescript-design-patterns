interface Coffee {
  getIngredients(): string;
  getCost(): number;
}

class SimpleCoffee implements Coffee {
  getIngredients(): string {
    return "Coffee";
  }

  getCost(): number {
    return 1;
  }
}

abstract class CoffeeDecorator implements Coffee {
  private readonly coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  getIngredients(): string {
    return this.coffee.getIngredients();
  }

  getCost(): number {
    return this.coffee.getCost();
  }
}

class WithMilk extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  getIngredients(): string {
    return super.getIngredients() + ", Milk";
  }

  getCost(): number {
    return super.getCost() + 0.5;
  }
}

class WithSugar extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  getIngredients(): string {
    return super.getIngredients() + ", Sugar";
  }

  getCost(): number {
    return super.getCost() + 1;
  }
}

class WithSprinkles extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  getIngredients(): string {
    return super.getIngredients() + ", Sprinkles";
  }

  getCost(): number {
    return super.getCost() + 0.2;
  }
}

(function () {
  const macchiato = new WithMilk(
    new WithSugar(new WithSprinkles(new SimpleCoffee()))
  );

  console.log(
    "Cost: " +
      macchiato.getCost() +
      "; Ingredients: " +
      macchiato.getIngredients()
  );
})();

export {};
