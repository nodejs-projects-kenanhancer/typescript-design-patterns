interface Car {
  assemble(): string;
}

class BasicCar implements Car {
  assemble(): string {
    return "Basic Car";
  }
}

abstract class CarDecorator implements Car {
  private readonly car: Car;

  constructor(car: Car) {
    this.car = car;
  }

  assemble(): string {
    return this.car.assemble();
  }
}

class SportsCar extends CarDecorator {
  constructor(car: Car) {
    super(car);
  }

  private addSportsCarFeatures() {
    return "Sports Features";
  }

  assemble(): string {
    return super.assemble() + ", " + this.addSportsCarFeatures();
  }
}

class LuxuryCar extends CarDecorator {
  constructor(car: Car) {
    super(car);
  }

  private addLuxuryCarFeatures() {
    return "Luxury Features";
  }

  assemble(): string {
    return super.assemble() + ", " + this.addLuxuryCarFeatures();
  }
}

(function () {
  const basicCar = new BasicCar();

  console.log(basicCar.assemble());

  const sportsCar = new SportsCar(new BasicCar());

  console.log(sportsCar.assemble());

  const luxuryCar = new LuxuryCar(new BasicCar());

  console.log(luxuryCar.assemble());

  const mixedFeaturesCar = new SportsCar(new LuxuryCar(new BasicCar()));

  console.log(mixedFeaturesCar.assemble());
})();

export {};
