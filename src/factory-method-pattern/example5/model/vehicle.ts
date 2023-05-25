import type { DTOValidatorType } from "../model/type";
import {
  Color,
  FuelType,
  MaintenanceStatusType,
  ToDTO,
  VehicleType,
} from "./type";
import { DTOValidator } from "./validator";

export class Vehicle {
  readonly type: VehicleType;
  readonly color: Color;
  readonly numberOfWheels: number;
  readonly fuelType: FuelType;
  private isRunning: boolean = false;
  private currentSpeed: number = 0;
  private fuelLevel: number = 100;
  private batteryLevel: number = 100;
  private maintenanceStatus: MaintenanceStatusType = "Good";
  private static validator: DTOValidatorType<Vehicle> =
    DTOValidator.createDefaultInstance();

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

  accelerate() {
    if (this.isRunning) {
      this.currentSpeed += 10;
      if (this.fuelType === "Electric") {
        this.batteryLevel -= 10;
      } else if (
        [
          "Petrol Hybrid",
          "Diesel Hybrid",
          "Petrol Plug-in Hybrid",
          "Diesel Plug-in Hybrid",
        ].includes(this.fuelType)
      ) {
        this.fuelLevel -= 5; // Hybrids use less fuel
        this.batteryLevel -= 5; // And some battery power
      } else {
        this.fuelLevel -= 10;
      }
    } else {
      console.log("Cannot accelerate, the vehicle is not running.");
    }
  }

  brake() {
    if (this.isRunning) {
      this.currentSpeed = 0;
      console.log("Vehicle is braking");
    } else {
      console.log("Cannot brake, the vehicle is not running");
    }
  }

  turn(direction: "left" | "right") {
    if (this.isRunning) {
      console.log(`Vehicle is turning ${direction}`);
    } else {
      console.log("Cannot turn, the vehicle is not running");
    }
  }

  startEngine() {
    if (!this.isRunning) {
      this.isRunning = true;
      console.log("Vehicle engine started");
    } else {
      console.log("Vehicle engine is already running");
    }
  }

  stopEngine() {
    if (this.isRunning) {
      this.isRunning = false;
      this.currentSpeed = 0;
      console.log("Vehicle engine stopped");
    } else {
      console.log("Vehicle engine is already stopped");
    }
  }

  getCurrentSpeed() {
    return this.currentSpeed;
  }

  getFuelLevel() {
    if (this.fuelType === "Electric") {
      console.log("This is an electric vehicle. No fuel level to display.");
      return null;
    } else {
      return this.fuelLevel;
    }
  }

  getBatteryLevel() {
    if (this.fuelType === "None") {
      console.log(
        "This is not an electric or hybrid vehicle. No battery level to display."
      );
      return null;
    } else {
      return this.batteryLevel;
    }
  }

  getMaintenanceStatus() {
    return this.maintenanceStatus;
  }

  private static validate(
    dto: ToDTO<Vehicle>,
    validator?: DTOValidatorType<Vehicle>
  ) {
    const _validator = validator || Vehicle.validator;

    if (_validator) {
      _validator.validate(dto);
    }
  }

  static createInstance(
    type: VehicleType,
    color: Color,
    numberOfWheels: number,
    fuelType: FuelType,
    validator?: DTOValidatorType<Vehicle>
  ): Vehicle {
    const vehicle = new Vehicle(type, color, numberOfWheels, fuelType);

    Vehicle.validate(vehicle, validator);

    return vehicle;
  }

  static createCar(
    color: Color,
    fuelType: FuelType,
    validator?: DTOValidatorType<Vehicle>
  ): Vehicle {
    const type: VehicleType = "Car";
    const numberOfWheels = 4;

    const vehicle = new Vehicle(type, color, numberOfWheels, fuelType);

    Vehicle.validate(vehicle, validator);

    return vehicle;
  }

  static createTruck(
    color: Color,
    fuelType: FuelType,
    validator?: DTOValidatorType<Vehicle>
  ): Vehicle {
    const type: VehicleType = "Truck";
    const numberOfWheels = 4;

    const vehicle = new Vehicle(type, color, numberOfWheels, fuelType);

    Vehicle.validate(vehicle, validator);

    return vehicle;
  }

  static createMotorBike(
    color: Color,
    fuelType: FuelType,
    validator?: DTOValidatorType<Vehicle>
  ): Vehicle {
    const type: VehicleType = "Motorbike";
    const numberOfWheels = 2;

    const vehicle = new Vehicle(type, color, numberOfWheels, fuelType);

    Vehicle.validate(vehicle, validator);

    return vehicle;
  }

  static createBike(
    color: Color,
    validator?: DTOValidatorType<Vehicle>
  ): Vehicle {
    const type: VehicleType = "Bike";
    const numberOfWheels = 2;
    const fuelType: FuelType = "None";

    const vehicle = new Vehicle(type, color, numberOfWheels, fuelType);

    Vehicle.validate(vehicle, validator);

    return vehicle;
  }

  static createElectricCar(
    color: Color,
    validator?: DTOValidatorType<Vehicle>
  ): Vehicle {
    const type: VehicleType = "Car";
    const numberOfWheels = 4;
    const fuelType: FuelType = "Electric";

    const vehicle = new Vehicle(type, color, numberOfWheels, fuelType);

    Vehicle.validate({ color, fuelType, numberOfWheels, type }, validator);

    return vehicle;
  }

  static setValidator(validator: DTOValidatorType<Vehicle>): void {
    Vehicle.validator = validator;
  }
}
