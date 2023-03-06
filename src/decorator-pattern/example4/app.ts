abstract class Beverage {
  private readonly description: string = "Unknown Beverage";

  getDescription() {
    return this.description;
  }

  abstract cost(): number;
}

class Expresso extends Beverage {
  cost(): number {
    return 1.99;
  }
}

class Decaf extends Beverage {
  cost(): number {
    return 1.05;
  }
}

class HouseBlend extends Beverage {
  cost(): number {
    return 89;
  }
}

class DarkRoast extends Beverage {
  cost(): number {
    return 99;
  }
}

abstract class CondimentDecorator extends Beverage {
  private readonly beverage: Beverage;

  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription(): string {
    return this.beverage.getDescription();
  }

  cost(): number {
    return this.beverage.cost();
  }
}

class Mocha extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super(beverage);
  }

  getDescription(): string {
    return super.getDescription() + ", Mocha";
  }

  cost(): number {
    return super.cost() + 20;
  }
}

class SteamedMilk extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super(beverage);
  }

  getDescription(): string {
    return super.getDescription() + ", Steamed Milk";
  }

  cost(): number {
    return super.cost() + 10;
  }
}

class Soy extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super(beverage);
  }

  getDescription(): string {
    return super.getDescription() + ", Soy";
  }

  cost(): number {
    return super.cost() + 15;
  }
}

class Whip extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super(beverage);
  }

  getDescription(): string {
    return super.getDescription() + ", Whip";
  }

  cost(): number {
    return super.cost() + 10;
  }
}

(function () {
  const expresso: Beverage = new Expresso();

  const decap: Beverage = new Decaf();

  const houseBlend: Beverage = new HouseBlend();

  const darkRoast: Beverage = new DarkRoast();

  const bevarage2: Beverage = new Mocha(new DarkRoast());

  const beverage3: Beverage = new Whip(new Expresso());

  const beverage4: Beverage = new Soy(new HouseBlend());

  console.log(`${expresso.getDescription()} $ ${expresso.cost()}`);
  console.log(`${decap.getDescription()} $ ${decap.cost()}`);
  console.log(`${houseBlend.getDescription()} $ ${houseBlend.cost()}`);
  console.log(`${darkRoast.getDescription()} $ ${darkRoast.cost()}`);
  console.log(`${bevarage2.getDescription()} $ ${bevarage2.cost()}`);
  console.log(`${beverage3.getDescription()} $ ${beverage3.cost()}`);
  console.log(`${beverage4.getDescription()} $ ${beverage4.cost()}`);
})();
