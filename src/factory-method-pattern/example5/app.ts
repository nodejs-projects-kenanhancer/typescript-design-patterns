// interface Command {
//   execute(): void;
// }

// interface VehicleValidationStrategy {
//   validate(vehicle: Vehicle): void;
// }

// abstract class ValidationStrategyDecorator
//   implements VehicleValidationStrategy
// {
//   private readonly validationStrategy: VehicleValidationStrategy;

//   constructor(validationStrategy: VehicleValidationStrategy) {
//     this.validationStrategy = validationStrategy;
//   }

//   validate(vehicle: Vehicle): void {
//     if (this.validationStrategy) {
//       this.validationStrategy.validate(vehicle);
//     }
//   }
// }

// class TypeValidationCommand implements Command {
//   execute(): void {
//     throw new Error("Method not implemented.");
//   }
// }

// class ColorValidationCommand implements Command {
//   execute(): void {
//     throw new Error("Method not implemented.");
//   }
// }

// class NumberOfWheelsValidationCommand implements Command {
//   execute(): void {
//     throw new Error("Method not implemented.");
//   }
// }

// class ColorValidationDecorator extends ValidationStrategyDecorator {
//   private constructor(validationStrategy: VehicleValidationStrategy) {
//     super(validationStrategy);
//   }

//   validate(vehicle: Vehicle): void {
//     super.validate(vehicle);

//     if (!vehicle.color) {
//       throw new Error("Color cannot be null or empty");
//     }
//   }

//   static createInstance(validationStrategy: VehicleValidationStrategy) {
//     return new ColorValidationDecorator(validationStrategy);
//   }

//   static use(validationStrategy: VehicleValidationStrategy) {
//     return new ColorValidationDecorator(validationStrategy);
//   }
// }

// class TypeValidationDecorator extends ValidationStrategyDecorator {
//   private constructor(validationStrategy: VehicleValidationStrategy) {
//     super(validationStrategy);
//   }

//   validate(vehicle: Vehicle): void {
//     super.validate(vehicle);

//     if (vehicle.type !== "car" && vehicle.type !== "bike") {
//       throw new Error("Type should be either 'car' or 'bike'");
//     }
//   }

//   static createInstance(validationStrategy: VehicleValidationStrategy) {
//     return new TypeValidationDecorator(validationStrategy);
//   }

//   static use(validationStrategy: VehicleValidationStrategy) {
//     return new TypeValidationDecorator(validationStrategy);
//   }
// }

// class NumberOfWheelsValidationDecorator extends ValidationStrategyDecorator {
//   private constructor(validationStrategy: VehicleValidationStrategy) {
//     super(validationStrategy);
//   }

//   validate(vehicle: Vehicle): void {
//     super.validate(vehicle);

//     if (vehicle.numberOfWheels <= 0) {
//       throw new Error("Number of wheels should be higher than zero");
//     }
//   }

//   static createInstance(validationStrategy: VehicleValidationStrategy) {
//     return new NumberOfWheelsValidationDecorator(validationStrategy);
//   }

//   static use(validationStrategy: VehicleValidationStrategy) {
//     return new NumberOfWheelsValidationDecorator(validationStrategy);
//   }
// }

// class NoValidationStrategy implements VehicleValidationStrategy {
//   private constructor() {}

//   validate(): void {}

//   static createInstance() {
//     return new NoValidationStrategy();
//   }
// }

// class Vehicle {
//   public readonly type: string;
//   public readonly color: string;
//   public readonly numberOfWheels: number;
//   public readonly isElectric: boolean;
//   private static validationStrategy: VehicleValidationStrategy =
//     NoValidationStrategy.createInstance();

//   private constructor(
//     type: string,
//     color: string,
//     numberOfWheels: number,
//     isElectric: boolean
//   ) {
//     this.type = type;
//     this.color = color;
//     this.numberOfWheels = numberOfWheels;
//     this.isElectric = isElectric;
//   }

//   static createCar(color: string) {
//     Vehicle.validationStrategy.validate();
//     return new Vehicle("car", color, 4, false);
//   }

//   static createBike(color: string) {
//     return new Vehicle("bike", color, 2, false);
//   }

//   static createElectricCar(color: string) {
//     return new Vehicle("car", color, 4, true);
//   }

//   static setValidationStrategy(validationStrategy: VehicleValidationStrategy) {
//     Vehicle.validationStrategy = validationStrategy;
//   }
// }

// class FactoryMethodClient {
//   static main() {
//     const vehicleValidationStrategy = ColorValidationDecorator.use(
//       TypeValidationDecorator.use(
//         NumberOfWheelsValidationDecorator.use(
//           NoValidationStrategy.createInstance()
//         )
//       )
//     );

//     Vehicle.setValidationStrategy(vehicleValidationStrategy);

//     const car = Vehicle.createCar("black");

//     const bike = Vehicle.createBike("green");

//     const electricCar = Vehicle.createElectricCar("white");

//     console.log(car);

//     console.log(bike);

//     console.log(electricCar);
//   }
// }

// FactoryMethodClient.main();

// export {};
