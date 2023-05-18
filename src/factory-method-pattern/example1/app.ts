class Vehicle {
  public readonly type: string;
  public readonly color: string;
  public readonly numberOfWheels: number;
  public readonly isElectric: boolean;

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
    return new Vehicle("car", color, 4, false);
  }

  static createBike(color: string) {
    return new Vehicle("bike", color, 2, false);
  }

  static createElectricCar(color: string) {
    return new Vehicle("car", color, 4, true);
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
