interface Car {
  getPrice(): number;
  getDescription(): string;
}

class BasicCar implements Car {
  getPrice(): number {
    return 10000;
  }

  getDescription(): string {
    return "Basic car";
  }
}

abstract class CarDecorator implements Car {
  private readonly car: Car;

  constructor(car: Car) {
    this.car = car;
  }

  getPrice(): number {
    return this.car.getPrice();
  }
  
  getDescription(): string {
    return this.car.getDescription();
  }
}

class SportsPackage extends CarDecorator {
  constructor(car: Car) {
    super(car);
  }

  getPrice(): number {
    return super.getPrice() + 2000;
  }

  getDescription(): string {
    return super.getDescription() + ", sports package";
  }
}

class LuxuryPackage extends CarDecorator {
  constructor(car: Car) {
    super(car);
  }

  getPrice(): number {
    return super.getPrice() + 5000;
  }

  getDescription(): string {
    return super.getDescription() + ", luxury package";
  }
}

(function () {
  const basicCar = new BasicCar();

  console.log(basicCar.getDescription() + " costs " + basicCar.getPrice());

  const sportCar = new SportsPackage(new BasicCar());

  console.log(sportCar.getDescription() + " costs " + sportCar.getPrice());

  const luxuryCar = new LuxuryPackage(new BasicCar());

  console.log(luxuryCar.getDescription() + " costs " + luxuryCar.getPrice());

  const fullyLoaded = new LuxuryPackage(new SportsPackage(new BasicCar()));

  console.log(
    fullyLoaded.getDescription() + " costs " + fullyLoaded.getPrice()
  );
})();

export {};
