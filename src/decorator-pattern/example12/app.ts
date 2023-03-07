interface Car {
  getDescription(): string;
  getCost(): number;
}

class BaseCar implements Car {
  getDescription(): string {
    return "Base Car";
  }

  getCost(): number {
    return 10000;
  }
}

abstract class CarOptions implements Car {
  private readonly car: Car;

  constructor(car: Car) {
    this.car = car;
  }

  getDescription(): string {
    return this.car.getDescription();
  }

  getCost(): number {
    return this.car.getCost();
  }
}

class LeatherSeats extends CarOptions {
  constructor(car: Car) {
    super(car);
  }

  getDescription(): string {
    return super.getDescription() + ", Leather Seats";
  }

  getCost(): number {
    return super.getCost() + 2000;
  }
}

class Sunroof extends CarOptions {
  constructor(car: Car) {
    super(car);
  }

  getDescription(): string {
    return super.getDescription() + ", Sunroof";
  }

  getCost(): number {
    return super.getCost() + 1500;
  }
}

(function () {
  const luxuryCar = new LeatherSeats(new Sunroof(new BaseCar()));

  console.log(luxuryCar.getDescription() + ", costs " + luxuryCar.getCost());
})();

export {};
