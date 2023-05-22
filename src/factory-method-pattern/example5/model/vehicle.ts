import { ValidatorType } from "../decorators";
import { Color, FuelType, VehicleType } from "./type";
import { Validator } from "./validator";

export class Vehicle {
  readonly type: VehicleType;
  readonly color: Color;
  readonly numberOfWheels: number;
  readonly fuelType: FuelType;
  private static validator: ValidatorType<Vehicle> =
    Validator.createDefaultInstance();

  private constructor(
    type: VehicleType,
    color: Color,
    numberOfWheels: number,
    fuelType: FuelType
  ) {
    this.type = type;
    this.color = color;
    this.numberOfWheels = numberOfWheels;
    this.fuelType = fuelType;
  }

  static createInstance(
    type: VehicleType,
    color: Color,
    numberOfWheels: number,
    fuelType: FuelType,
    validator?: ValidatorType<Vehicle>
  ): Vehicle {
    if (validator) {
      validator.validate({ color, fuelType, numberOfWheels, type });
    }

    return new Vehicle(type, color, numberOfWheels, fuelType);
  }

  static createCar(
    color: Color,
    fuelType: FuelType,
    validator?: ValidatorType<Vehicle>
  ): Vehicle {
    const type: VehicleType = "Car";
    const numberOfWheels = 4;

    if (validator) {
      validator.validate({ color, fuelType, numberOfWheels, type });
    }

    return new Vehicle(type, color, numberOfWheels, fuelType);
  }

  static createMotorBike(
    color: Color,
    fuelType: FuelType,
    validator?: ValidatorType<Vehicle>
  ): Vehicle {
    const type: VehicleType = "Motorbike";
    const numberOfWheels = 2;

    if (validator) {
      validator.validate({ color, fuelType, numberOfWheels, type });
    }

    return new Vehicle(type, color, numberOfWheels, fuelType);
  }

  static createBike(color: Color, validator?: ValidatorType<Vehicle>): Vehicle {
    const type: VehicleType = "Bike";
    const numberOfWheels = 2;
    const fuelType: FuelType = "None";

    if (validator) {
      validator.validate({ color, fuelType, numberOfWheels, type });
    }

    return new Vehicle(type, color, numberOfWheels, fuelType);
  }

  static createElectricCar(
    color: Color,
    validator?: ValidatorType<Vehicle>
  ): Vehicle {
    const type: VehicleType = "Car";
    const numberOfWheels = 4;
    const fuelType: FuelType = "Electric";

    if (validator) {
      validator.validate({ color, fuelType, numberOfWheels, type });
    }

    return new Vehicle(type, color, numberOfWheels, fuelType);
  }

  static setValidator(validator: ValidatorType<Vehicle>): void {
    Vehicle.validator = validator;
  }
}
