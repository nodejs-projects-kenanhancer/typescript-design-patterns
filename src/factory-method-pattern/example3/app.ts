interface FieldDecorator<TField = any> {
  execute(fieldName: string, fieldValue: TField): TField;
}

abstract class BaseFieldDecorator<TField = any>
  implements FieldDecorator<TField>
{
  private readonly nextFieldDecorator?: FieldDecorator<TField>;

  constructor(nextFieldDecorator?: FieldDecorator<TField>) {
    this.nextFieldDecorator = nextFieldDecorator;
  }

  execute(fieldName: string, fieldValue: TField): TField {
    if (this.nextFieldDecorator) {
      return this.nextFieldDecorator.execute(fieldName, fieldValue);
    }

    return fieldValue;
  }
}

class MinValue extends BaseFieldDecorator<number> {
  private readonly minValue;

  constructor(minValue: number, nextFieldDecorator?: FieldDecorator<number>) {
    super(nextFieldDecorator);

    this.minValue = minValue;
  }

  execute(fieldName: string, fieldValue: number): number {
    if (fieldValue < this.minValue) {
      throw new Error(`${fieldName} can't be less than ${this.minValue}`);
    }

    return super.execute(fieldName, fieldValue);
  }
}

class MaxValue extends BaseFieldDecorator<number> {
  private readonly maxValue;

  constructor(maxValue: number, nextFieldDecorator?: FieldDecorator<number>) {
    super(nextFieldDecorator);

    this.maxValue = maxValue;
  }

  execute(fieldName: string, fieldValue: number): number {
    if (fieldValue > this.maxValue) {
      throw new Error(`${fieldName} can't be greater than ${this.maxValue}`);
    }

    return super.execute(fieldName, fieldValue);
  }
}

class Length<TValue> extends BaseFieldDecorator<TValue> {
  private readonly length: number;

  constructor(length: number, nextFieldDecorator?: FieldDecorator<TValue>) {
    super(nextFieldDecorator);

    this.length = length;
  }

  execute(fieldName: string, fieldValue: TValue): TValue {
    if (fieldName.length > this.length) {
      throw new Error(
        `${fieldName} length can't be greater than ${this.length}`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}

class AllowedValues<
  TValue,
  const T extends readonly TValue[]
> extends BaseFieldDecorator<TValue> {
  private readonly allowedValues: T;

  constructor(allowedValues: T, nextFieldDecorator?: FieldDecorator<TValue>) {
    super(nextFieldDecorator);
    this.allowedValues = allowedValues;
  }

  execute(fieldName: string, fieldValue: TValue): TValue {
    if (!this.allowedValues.includes(fieldValue)) {
      throw new Error(`${fieldName} should be one of [${this.allowedValues}]`);
    }

    return super.execute(fieldName, fieldValue);
  }
}

class DeniedValues<TValue> extends BaseFieldDecorator<TValue> {
  private readonly deniedValues: TValue[];

  constructor(
    deniedValues: TValue[],
    nextFieldDecorator?: FieldDecorator<TValue>
  ) {
    super(nextFieldDecorator);

    this.deniedValues = deniedValues;
  }

  execute(fieldName: string, fieldValue: TValue): TValue {
    if (this.deniedValues.includes(fieldValue)) {
      throw new Error(`${fieldName} can't be one of [${this.deniedValues}]`);
    }

    return super.execute(fieldName, fieldValue);
  }
}

class NotEmpty extends BaseFieldDecorator<string> {
  constructor(nextFieldDecorator?: FieldDecorator<string>) {
    super(nextFieldDecorator);
  }

  execute(fieldName: string, fieldValue: string): string {
    if (fieldValue === "") {
      throw new Error(`${fieldName} can't be empty string`);
    }

    return super.execute(fieldName, fieldValue);
  }
}

class NotNull<TValue> extends BaseFieldDecorator<TValue> {
  execute(fieldName: string, fieldValue: TValue): TValue {
    if (!fieldValue) {
      throw new Error(`${fieldName} can't be null`);
    }

    return super.execute(fieldName, fieldValue);
  }
}

class PrintValue<TValue> extends BaseFieldDecorator<TValue> {
  execute(fieldName: string, fieldValue: TValue) {
    console.log(`${fieldName} is ${fieldValue}`);

    return super.execute(fieldName, fieldValue);
  }
}

class Pipe<TValue> extends BaseFieldDecorator<TValue> {
  private readonly nextFieldDecorators: FieldDecorator<TValue>[];

  constructor(...nextFieldDecorators: FieldDecorator<TValue>[]) {
    super();
    this.nextFieldDecorators = nextFieldDecorators;
  }

  execute(fieldName: string, fieldValue: TValue): TValue {
    let result: TValue;
    for (const fieldDecorator of this.nextFieldDecorators) {
      result = fieldDecorator.execute(fieldName, fieldValue);
    }

    return result!;
  }
}

class NoValidation extends BaseFieldDecorator {}

class VehicleValidator {
  public readonly typeValidator: FieldDecorator<VehicleType>;
  public readonly colorValidator: FieldDecorator<Color>;
  public readonly numberOfWheelsValidator: FieldDecorator<number>;
  public readonly fuelTypeValidator: FieldDecorator<FuelType>;

  private constructor(
    typeValidator: FieldDecorator<VehicleType>,
    colorValidator: FieldDecorator<Color>,
    numberOfWheelsValidator: FieldDecorator<number>,
    fuelTypeValidator: FieldDecorator<FuelType>
  ) {
    this.typeValidator = typeValidator;
    this.colorValidator = colorValidator;
    this.numberOfWheelsValidator = numberOfWheelsValidator;
    this.fuelTypeValidator = fuelTypeValidator;
  }

  static createInstance(
    typeValidator: FieldDecorator<VehicleType>,
    colorValidator: FieldDecorator<Color>,
    numberOfWheelsValidator: FieldDecorator<number>,
    fuelTypeValidator: FieldDecorator<FuelType>
  ) {
    return new VehicleValidator(
      typeValidator,
      colorValidator,
      numberOfWheelsValidator,
      fuelTypeValidator
    );
  }

  static createDefaultInstance() {
    const noValidation = new NoValidation();

    return new VehicleValidator(
      noValidation,
      noValidation,
      noValidation,
      noValidation
    );
  }
}

const VEHICLE_TYPES = [
  "Car",
  "Van",
  "Caravan",
  "Truck",
  "Motorbike",
  "Bike",
] as const;

const COLOR = [
  "Red",
  "Green",
  "Blue",
  "Black",
  "Yellow",
  "White",
  "Orange",
  "Purple",
] as const;

const FUEL_TYPES = [
  "Petrol",
  "Diesel",
  "Electric",
  "Petrol Hybrid",
  "Diesel Hybrid",
  "Petrol Plug-in Hybrid",
  "Diesel Plug-in Hybrid",
  "None",
] as const;

type Color = (typeof COLOR)[number];

type FuelType = (typeof FUEL_TYPES)[number];

type VehicleType = (typeof VEHICLE_TYPES)[number];

class Vehicle {
  public readonly type: VehicleType;
  public readonly color: Color;
  public readonly numberOfWheels: number;
  public readonly fuelType: FuelType;
  private static vehicleValidator = VehicleValidator.createDefaultInstance();

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
    vehicleValidator?: VehicleValidator
  ) {
    const _vehicleValidator = vehicleValidator || Vehicle.vehicleValidator;

    if (_vehicleValidator) {
      _vehicleValidator.typeValidator.execute("type", type);
      _vehicleValidator.colorValidator.execute("color", color);
      _vehicleValidator.fuelTypeValidator.execute("fuelType", fuelType);
      _vehicleValidator.numberOfWheelsValidator.execute(
        "numberOfWheels",
        numberOfWheels
      );
    }

    return new Vehicle(type, color, numberOfWheels, fuelType);
  }

  static createCar(
    color: Color,
    fuelType: FuelType,
    vehicleValidator?: VehicleValidator
  ) {
    const _vehicleValidator = vehicleValidator || Vehicle.vehicleValidator;

    if (_vehicleValidator) {
      _vehicleValidator.colorValidator.execute("color", color);
      _vehicleValidator.fuelTypeValidator.execute("fuelType", fuelType);
    }

    return new Vehicle("Car", color, 4, fuelType);
  }

  static createMotorBike(
    color: Color,
    fuelType: FuelType,
    vehicleValidator?: VehicleValidator
  ) {
    const _vehicleValidator = vehicleValidator || Vehicle.vehicleValidator;

    if (_vehicleValidator) {
      _vehicleValidator.colorValidator.execute("color", color);
      _vehicleValidator.fuelTypeValidator.execute("fuelType", fuelType);
    }

    return new Vehicle("Motorbike", color, 2, fuelType);
  }

  static createBike(color: Color, vehicleValidator?: VehicleValidator) {
    const _vehicleValidator = vehicleValidator || Vehicle.vehicleValidator;

    if (_vehicleValidator) {
      _vehicleValidator.colorValidator.execute("color", color);
    }

    return new Vehicle("Bike", color, 2, "None");
  }

  static createElectricCar(color: Color, vehicleValidator?: VehicleValidator) {
    const _vehicleValidator = vehicleValidator || Vehicle.vehicleValidator;

    if (_vehicleValidator) {
      _vehicleValidator.colorValidator.execute("color", color);
    }

    return new Vehicle("Car", color, 4, "Electric");
  }

  static setVehicleValidator(vehicleValidator: VehicleValidator) {
    Vehicle.vehicleValidator = vehicleValidator;
  }
}

const a1: FieldDecorator<FuelType> = new Pipe<FuelType>(
  new AllowedValues(["Diesel", "Electric"])
);

class FactoryMethodClient {
  static main() {
    const vehicleValidator = VehicleValidator.createInstance(
      new AllowedValues([...VEHICLE_TYPES], new PrintValue()),
      new Pipe(new AllowedValues([...COLOR], new PrintValue())),
      //   new MinValue(0, new MaxValue(8)),
      new Pipe(new MinValue(0), new MaxValue(8), new PrintValue()),
      //   new Pipe([new MinValue(0, new MaxValue(8))]),
      // new Pipe(new AllowedValues([...FUEL_TYPES]), new PrintValue())
      new Pipe(new AllowedValues([...FUEL_TYPES]))
    );

    Vehicle.setVehicleValidator(vehicleValidator);

    const jeep = Vehicle.createInstance("Car", "Blue", 8, "Petrol");

    const car = Vehicle.createCar("Black", "Petrol");

    const bike = Vehicle.createBike("Green");

    const electricCar = Vehicle.createElectricCar("White");

    console.log(jeep);

    console.log(car);

    console.log(bike);

    console.log(electricCar);
  }
}

FactoryMethodClient.main();

export {};
