import { AirplaneRequest, ControlTower } from "../mediator";
import { Airplane } from "./airplane";

// Concrete Colleague
export class Boeing implements Airplane {
  name: string;
  private readonly controlTower: ControlTower;

  constructor(name: string, controlTower: ControlTower) {
    this.name = name;
    this.controlTower = controlTower;
    controlTower.register(this);
  }

  requestLanding(): void {
    console.log(`${this.name} is requesting permission to land.`);

    this.controlTower.receive(AirplaneRequest.Landing, this);
  }

  requestTakeoff(): void {
    console.log(`${this.name} is requesting permission to take off.`);

    this.controlTower.receive(AirplaneRequest.Takeoff, this);
  }

  requestTaxi(): void {
    console.log(`${this.name} is requesting permission to taxi.`);

    this.controlTower.receive(AirplaneRequest.Taxi, this);
  }

  reportPosition(): void {
    console.log(`${this.name} is reporting its position.`);

    this.controlTower.receive(AirplaneRequest.Position, this);
  }

  reportEmergency(): void {
    console.log(`${this.name} is reporting an emergency.`);

    this.controlTower.receive(AirplaneRequest.Emergency, this);
  }

  reportMaintenanceStatus(): void {
    console.log(`${this.name} is reporting its maintenance status.`);

    this.controlTower.receive(AirplaneRequest.Maintenance, this);
  }

  requestFuel(): void {
    console.log(`${this.name} is requesting fuel.`);

    this.controlTower.receive(AirplaneRequest.Refueling, this);
  }

  reportFuelStatus(): void {
    console.log(`${this.name} is reporting its fuel status.`);

    this.controlTower.receive(AirplaneRequest.FuelStatus, this);
  }

  requestRunwayConditions(): void {
    console.log(`${this.name} is requesting runway conditions.`);

    this.controlTower.receive(AirplaneRequest.RunwayCondition, this);
  }

  receiveWeatherUpdate(weatherUpdate: string): void {
    console.log(`${this.name} received weather update: ${weatherUpdate}`);
  }

  receiveFlightPlan(flightPlan: string): void {
    console.log(`${this.name} received flight plan: ${flightPlan}`);
  }

  receivePassengerCount(passengerCount: number): void {
    console.log(`${this.name} received passenger count: ${passengerCount}`);
  }

  receive(message: string): void {
    console.log(`${this.name} receives message: ${message}`);
  }
}
