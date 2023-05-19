//TFieldValue extends TField extends never ? TRecord[TFieldName] : TField
type TFieldName<
  TRecord,
  TFieldValue,
  TFieldName extends keyof TRecord = keyof TRecord
> = TFieldName extends any
  ? TRecord[TFieldName] extends TFieldValue
    ? TFieldName & string
    : never
  : never;

interface FieldDecorator<TRecord, TFieldValue> {
  execute(
    fieldName: TFieldName<TRecord, TFieldValue>,
    fieldValue: TFieldValue
  ): TFieldValue;
}

abstract class BaseFieldDecorator<TRecord, TFieldValue = any>
  implements FieldDecorator<TRecord, TFieldValue>
{
  private readonly fieldDecorator?: FieldDecorator<TRecord, TFieldValue>;

  constructor(fieldDecorator?: FieldDecorator<TRecord, TFieldValue>) {
    this.fieldDecorator = fieldDecorator;
  }

  execute(
    fieldName: TFieldName<TRecord, TFieldValue, keyof TRecord>,
    fieldValue: TFieldValue
  ): TFieldValue {
    if (this.fieldDecorator) {
      return this.fieldDecorator.execute(fieldName, fieldValue);
    }

    return fieldValue;
  }
}

class MinValue<TRecord> extends BaseFieldDecorator<TRecord, number> {
  private readonly minValue;

  constructor(
    minValue: number,
    fieldDecorator?: FieldDecorator<TRecord, number>
  ) {
    super(fieldDecorator);

    this.minValue = minValue;
  }

  execute(
    fieldName: TFieldName<TRecord, number, keyof TRecord>,
    fieldValue: number
  ): number {
    if (fieldValue < this.minValue) {
      throw new Error(`${fieldName} can't be less than ${this.minValue}`);
    }

    return super.execute(fieldName, fieldValue);
  }
}

class MaxValue<TRecord> extends BaseFieldDecorator<TRecord, number> {
  private readonly maxValue;

  constructor(
    maxValue: number,
    fieldDecorator?: FieldDecorator<TRecord, number>
  ) {
    super(fieldDecorator);

    this.maxValue = maxValue;
  }

  execute(
    fieldName: TFieldName<TRecord, number, keyof TRecord>,
    fieldValue: number
  ): number {
    if (fieldValue > this.maxValue) {
      throw new Error(`${fieldName} can't be greater than ${this.maxValue}`);
    }

    return super.execute(fieldName, fieldValue);
  }
}

class Length<TRecord> extends BaseFieldDecorator<TRecord> {
  private readonly length: number;

  constructor(length: number, fieldDecorator?: FieldDecorator<TRecord, any>) {
    super(fieldDecorator);

    this.length = length;
  }

  execute(fieldName: TFieldName<TRecord, any, keyof TRecord>, fieldValue: any) {
    if (fieldName.length > this.length) {
      throw new Error(
        `${fieldName} length can't be greater than ${this.length}`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}

class AllowedValues<
  TRecord,
  TValue,
  const TValues extends readonly TValue[]
> extends BaseFieldDecorator<TRecord, TValue> {
  private readonly allowedValues: TValues;

  constructor(
    allowedValues: TValues,
    fieldDecorator?: FieldDecorator<TRecord, TValue>
  ) {
    super(fieldDecorator);
    this.allowedValues = allowedValues;
  }

  execute(fieldName: TFieldName<TRecord, any, keyof TRecord>, fieldValue: any) {
    if (!this.allowedValues.includes(fieldValue)) {
      throw new Error(`${fieldName} should be one of [${this.allowedValues}]`);
    }

    return super.execute(fieldName, fieldValue);
  }
}

class DeniedValues<
  TRecord,
  const TValues extends readonly TRecord[]
> extends BaseFieldDecorator<TRecord> {
  private readonly deniedValues: TValues[];

  constructor(
    deniedValues: TValues[],
    fieldDecorator?: FieldDecorator<TRecord, any>
  ) {
    super(fieldDecorator);

    this.deniedValues = deniedValues;
  }

  execute(fieldName: TFieldName<TRecord, any, keyof TRecord>, fieldValue: any) {
    if (this.deniedValues.includes(fieldValue)) {
      throw new Error(`${fieldName} can't be one of [${this.deniedValues}]`);
    }

    return super.execute(fieldName, fieldValue);
  }
}

class NotEmpty<TRecord> extends BaseFieldDecorator<TRecord, string> {
  execute(
    fieldName: TFieldName<TRecord, string, keyof TRecord>,
    fieldValue: string
  ): string {
    if (fieldValue === "") {
      throw new Error(`${fieldName} can't be empty string`);
    }

    return super.execute(fieldName, fieldValue);
  }
}

class NotNull<TRecord> extends BaseFieldDecorator<TRecord> {
  execute(fieldName: TFieldName<TRecord, any, keyof TRecord>, fieldValue: any) {
    if (!fieldValue) {
      throw new Error(`${fieldName} can't be null`);
    }

    return super.execute(fieldName, fieldValue);
  }
}

class PrintValue<TRecord> extends BaseFieldDecorator<TRecord> {
  execute(fieldName: TFieldName<TRecord, any, keyof TRecord>, fieldValue: any) {
    console.log(`${fieldName} is ${fieldValue}`);

    return super.execute(fieldName, fieldValue);
  }
}

class Pipe<TRecord, TValue> extends BaseFieldDecorator<TRecord, TValue> {
  private readonly fieldDecorators: FieldDecorator<TRecord, TValue>[];

  constructor(...fieldDecorators: FieldDecorator<TRecord, TValue>[]) {
    super();

    this.fieldDecorators = fieldDecorators;
  }

  execute(
    fieldName: TFieldName<TRecord, TValue, keyof TRecord>,
    fieldValue: TValue
  ): TValue {
    let result: TValue;
    for (const fieldDecorator of this.fieldDecorators) {
      result = fieldDecorator.execute(fieldName, fieldValue);
    }

    return result!;
  }
}

class NoValidation<TRecord> extends BaseFieldDecorator<TRecord> {}

class VehicleValidator {
  public readonly typeValidator: FieldDecorator<Vehicle, VehicleType>;
  public readonly colorValidator: FieldDecorator<Vehicle, Color>;
  public readonly numberOfWheelsValidator: FieldDecorator<Vehicle, number>;
  public readonly fuelTypeValidator: FieldDecorator<Vehicle, FuelType>;

  private constructor(
    typeValidator: FieldDecorator<Vehicle, VehicleType>,
    colorValidator: FieldDecorator<Vehicle, Color>,
    numberOfWheelsValidator: FieldDecorator<Vehicle, number>,
    fuelTypeValidator: FieldDecorator<Vehicle, FuelType>
  ) {
    this.typeValidator = typeValidator;
    this.colorValidator = colorValidator;
    this.numberOfWheelsValidator = numberOfWheelsValidator;
    this.fuelTypeValidator = fuelTypeValidator;
  }

  static createInstance(
    typeValidator: FieldDecorator<Vehicle, VehicleType>,
    colorValidator: FieldDecorator<Vehicle, Color>,
    numberOfWheelsValidator: FieldDecorator<Vehicle, number>,
    fuelTypeValidator: FieldDecorator<Vehicle, FuelType>
  ) {
    return new VehicleValidator(
      typeValidator,
      colorValidator,
      numberOfWheelsValidator,
      fuelTypeValidator
    );
  }

  static createDefaultInstance() {
    const noValidation = new NoValidation<Vehicle>();

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

class FactoryMethodClient {
  static main() {
    const vehicleValidator = VehicleValidator.createInstance(
      new AllowedValues([...VEHICLE_TYPES], new PrintValue()),
      new Pipe(new AllowedValues([...COLOR], new PrintValue())),
      new MinValue(0, new MaxValue(8)),
      // new Pipe(new MinValue(0), new MaxValue(8), new PrintValue()),
      // new Pipe([new MinValue(0, new MaxValue(8))]),
      new Pipe(new AllowedValues([...FUEL_TYPES]), new PrintValue())
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
