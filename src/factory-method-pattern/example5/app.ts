import {
  AllowedValues,
  MaxValue,
  MinValue,
  NotEmpty,
  NotNull,
  Pipe,
  PrintValue,
} from "./decorators";
import { User, Vehicle } from "./model";
import {
  COLOR,
  COUNTRY_NAMES,
  FUEL_TYPES,
  ROLES,
  VEHICLE_TYPES,
} from "./model/constant";
import { Validator } from "./model/validator";

class FactoryMethodClient {
  static main() {
    this.testVehicle();

    this.testUser();
  }

  static testVehicle() {
    const vehicleValidator = Validator.createInstance<Vehicle>({
      type: new AllowedValues([...VEHICLE_TYPES], new PrintValue()),
      color: new Pipe(new AllowedValues([...COLOR], new PrintValue())),
      numberOfWheels: new MinValue(0, new MaxValue(8)),
      fuelType: new Pipe(new AllowedValues([...FUEL_TYPES]), new PrintValue()),
    });

    Vehicle.setValidator(vehicleValidator);

    const jeep = Vehicle.createInstance("Car", "Blue", 8, "Petrol");

    const car = Vehicle.createCar("Black", "Petrol");

    const bike = Vehicle.createBike("Green");

    const electricCar = Vehicle.createElectricCar("White");

    console.log(jeep);

    console.log(car);

    console.log(bike);

    console.log(electricCar);
  }

  static testUser() {
    const userValidator = Validator.createInstance<User>({
      age: new MinValue(1, new MaxValue(120)),
      country: new AllowedValues([...COUNTRY_NAMES]),
      email: new NotEmpty(),
      name: new Pipe(new NotEmpty(), new NotNull()),
      password: new Pipe(new NotEmpty(), new NotNull(), new PrintValue()),
      role: new AllowedValues([...ROLES]),
    });

    const member = User.createMember(
      {
        name: "kenan",
        age: 39,
        country: "Afghanistan",
        email: "kh@kh.com",
        password: "11111",
      },
      userValidator
    );
  }
}

FactoryMethodClient.main();

export {};
