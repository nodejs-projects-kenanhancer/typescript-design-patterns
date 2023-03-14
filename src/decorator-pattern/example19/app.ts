interface Car {
  paint(): void;
}

class ElectricCar implements Car {
  paint(): void {
    throw new Error("Method not implemented.");
  }
}

class PetrolCar implements Car {
  paint(): void {
    throw new Error("Method not implemented.");
  }
}

class DieselCar implements Car {
  paint(): void {
    throw new Error("Method not implemented.");
  }
}

class HybridCar implements Car {
  paint(): void {
    throw new Error("Method not implemented.");
  }
}

abstract class CarDecorator implements Car {
  protected readonly car: Car;

  constructor(car: Car) {
    this.car = car;
  }

  paint(): void {
    this.car.paint();
  }
}

class CarColorDecorator extends CarDecorator {
  constructor(car: Car) {
    super(car);
  }

  private setTheme() {}

  paint(): void {
    super.paint();

    this.setTheme();
  }
}

(function () {
  const blackPetrolCar = new CarColorDecorator(new PetrolCar());

  blackPetrolCar.paint();
})();

export {};
