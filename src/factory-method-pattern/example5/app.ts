import { IsIn, IsNotEmpty, Max, Min, Pipe, PrintValue } from "./decorators";
import { IsDefined } from "./decorators/common";
import { IsMobilePhone } from "./decorators/string/is-mobile-phone";
import { Shape, User, Vehicle } from "./model";
import {
  COLOR,
  COUNTRY_NAMES,
  FUEL_TYPES,
  ROLES,
  SHAPE_TYPES,
  VEHICLE_TYPES,
} from "./model/constant";
import { DTOValidator } from "./model/validator";

class FactoryMethodClient {
  static main() {
    FactoryMethodClient.testVehicle();

    FactoryMethodClient.testUser();

    FactoryMethodClient.testShape();
  }

  static testVehicle() {
    const vehicleValidator = DTOValidator.createInstance<Vehicle>({
      type: new IsIn([...VEHICLE_TYPES], new PrintValue()),
      color: new Pipe(new IsIn([...COLOR], new PrintValue())),
      numberOfWheels: new Min(0, new Max(8, new PrintValue())),
      fuelType: new Pipe(new IsIn([...FUEL_TYPES]), new PrintValue()),
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
    const userValidator = DTOValidator.createInstance<User>({
      age: new Min(1, new Max(120)),
      country: new IsIn([...COUNTRY_NAMES]),
      email: new IsNotEmpty(),
      name: new Pipe(new IsNotEmpty(), new IsDefined()),
      password: new Pipe(new IsNotEmpty(), new IsDefined(), new PrintValue()),
      role: new IsIn([...ROLES]),
      mobilePhone: new IsMobilePhone("tr-TR"),
    });

    const member = User.createMember(
      {
        name: "kenan",
        age: 39,
        country: "Afghanistan",
        email: "kh@kh.com",
        password: "11111",
        mobilePhone: "+905455555555",
      },
      userValidator
    );

    console.log(member);
  }

  static testShape() {
    const shapeValidator = DTOValidator.createInstance<Shape>({
      area: new Pipe(new Min(0), new Max(1000)),
      perimeter: new Pipe(new Min(0), new Max(100)),
      type: new IsIn([...SHAPE_TYPES]),
    });

    const circle = Shape.createCircle(10, shapeValidator);

    const rectangle = Shape.createRectangle(10, 20, shapeValidator);

    const square = Shape.createSquare(10, shapeValidator);

    console.log(circle);

    console.log(rectangle);

    console.log(square);
  }
}

FactoryMethodClient.main();

export {};
