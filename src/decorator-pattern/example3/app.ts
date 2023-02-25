interface IceCreamCone {
  getFlavors(): string;
}

class SimpleIceCreamCone implements IceCreamCone {
  getFlavors(): string {
    return "Vanilla";
  }
}

abstract class IceCreamConeDecorator implements IceCreamCone {
  protected readonly decoratedIceCreamCone: IceCreamCone;

  constructor(decoratedIceCreamCone: IceCreamCone) {
    this.decoratedIceCreamCone = decoratedIceCreamCone;
  }

  getFlavors(): string {
    return this.decoratedIceCreamCone.getFlavors();
  }
}

class ChocolateDecorator extends IceCreamConeDecorator {
  constructor(decoratedIceCreamCone: IceCreamCone) {
    super(decoratedIceCreamCone);
  }

  getFlavors(): string {
    return super.getFlavors() + ", Chocolate";
  }
}

class StrawberryDecorator extends IceCreamConeDecorator {
  constructor(decoratedIceCreamCone: IceCreamCone) {
    super(decoratedIceCreamCone);
  }

  getFlavors(): string {
    return super.getFlavors() + ", Strawberry";
  }
}

(function () {
  const iceCreamCone: IceCreamCone = new SimpleIceCreamCone();

  const chocolateIceCreamCone: IceCreamCone = new ChocolateDecorator(
    new SimpleIceCreamCone()
  );

  const strawberryIceCreamCone: IceCreamCone = new StrawberryDecorator(
    new SimpleIceCreamCone()
  );

  const mixIceCreamCone: IceCreamCone = new StrawberryDecorator(
    new ChocolateDecorator(new SimpleIceCreamCone())
  );

  console.log(
    `Flavors of the ice cream cone are: ${iceCreamCone.getFlavors()}`
  );

  console.log(
    `Flavors of the ice cream cone are: ${chocolateIceCreamCone.getFlavors()}`
  );

  console.log(
    `Flavors of the ice cream cone are: ${strawberryIceCreamCone.getFlavors()}`
  );

  console.log(
    `Flavors of the ice cream cone are: ${mixIceCreamCone.getFlavors()}`
  );
})();
