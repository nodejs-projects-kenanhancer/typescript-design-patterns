interface ValidationStrategy {
  validate(type: string, color: string): void;
}

class DefaultValidationStrategy implements ValidationStrategy {
  private constructor() {}

  validate(type: string, color: string): void {
    if (!color) {
      throw new Error("Color cannot be null or empty");
    }

    if (type !== "car" && type !== "bike") {
      throw new Error("Type should be either 'car' or 'bike'");
    }
  }

  static createInstance() {
    return new DefaultValidationStrategy();
  }
}

class Vehicle {
  public readonly type: string;
  public readonly color: string;
  public readonly numberOfWheels: number;
  public readonly isElectric: boolean;
  private static validationStrategy: ValidationStrategy =
    DefaultValidationStrategy.createInstance();

  private constructor(
    type: string,
    color: string,
    numberOfWheels: number,
    isElectric: boolean
  ) {
    this.type = type;
    this.color = color;
    this.numberOfWheels = numberOfWheels;
    this.isElectric = isElectric;
  }

  static createCar(color: string) {
    Vehicle.validationStrategy.validate("car", color);

    return new Vehicle("car", color, 4, false);
  }

  static createBike(color: string) {
    Vehicle.validationStrategy.validate("bike", color);

    return new Vehicle("bike", color, 2, false);
  }

  static createElectricCar(color: string) {
    Vehicle.validationStrategy.validate("car", color);

    return new Vehicle("car", color, 4, true);
  }

  static setValidationStrategy(validationStrategy: ValidationStrategy) {
    Vehicle.validationStrategy = validationStrategy;
  }
}

class FactoryMethodClient {
  static main() {
    const car = Vehicle.createCar("black");

    const bike = Vehicle.createBike("green");

    const electricCar = Vehicle.createElectricCar("white");

    console.log(car);

    console.log(bike);

    console.log(electricCar);
  }
}

FactoryMethodClient.main();

export {};
