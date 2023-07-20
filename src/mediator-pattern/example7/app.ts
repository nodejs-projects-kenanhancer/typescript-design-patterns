// Colleague interface
interface Airplane {
  name: string;

  requestLanding(): void;
  requestTakeoff(): void;
  requestTaxi(): void;
  reportPosition(): void;
  reportEmergency(): void;
  reportMaintenanceStatus(): void;
  receiveWeatherUpdate(weatherUpdate: string): void;
  receiveFlightPlan(flightPlan: string): void;
  requestFuel(): void;
  reportFuelStatus(): void;
  requestRunwayConditions(): void;
  receivePassengerCount(passengerCount: number): void;
  receive(message: string): void;
}

// Mediator interface
interface ControlTower {
  register(airplane: Airplane): void;
  receive(message: string, from: Airplane): void;
  notifyAll(message: string): void;
  notify(message: string, to: Airplane): void;
}

// Concrete Mediator
class JFKControlTower implements ControlTower {
  private airplanes: Airplane[] = [];

  private handleLandingRequest(from: Airplane) {
    console.log(`Handling landing request from ${from.name}`);

    this.notify("Permission to land granted.", from);
  }

  private handleTakeoffRequest(from: Airplane) {
    console.log(`Handling takeoff request from ${from.name}`);

    this.notify("Permission to take off granted.", from);
  }

  private handlePositionReport(from: Airplane) {
    console.log(`Handling position report from ${from.name}`);

    this.notify("Position received.", from);
  }

  private handleEmergencyReport(from: Airplane) {
    console.log(`Handling emergency report from ${from.name}`);

    this.notifyAll(`${from.name} is reporting an emergency situation.`);
  }

  private handleTaxiRequest(from: Airplane) {
    console.log(`Handling taxi request from ${from.name}`);

    this.notify("Taxi permission granted.", from);
  }

  private handleMaintenanceStatus(from: Airplane) {
    console.log(`Handling maintenance status from ${from.name}`);

    this.notify("Maintenance status received.", from);
  }

  private handleRefuelingRequest(from: Airplane) {
    console.log(`Handling refueling request from ${from.name}`);

    this.notify("Refueling team is on its way.", from);
  }

  private handleFuelStatusReport(from: Airplane) {
    console.log(`Handling fuel status report from ${from.name}`);

    this.notify("Fuel status acknowledged.", from);
  }

  private handleRunwayConditionRequest(from: Airplane) {
    console.log(`Handling runway conditions request from ${from.name}`);

    this.notify("Runway conditions are normal.", from);
  }

  register(airplane: Airplane): void {
    this.airplanes.push(airplane);

    console.log(`Airplane ${airplane.name} registered.`);
  }

  receive(message: string, from: Airplane): void {
    console.log(`Message received from ${from.name}: ${message}`);

    switch (message) {
      case "Requesting permission to land.":
        this.handleLandingRequest(from);
        break;
      case "Requesting permission to take off.":
        this.handleTakeoffRequest(from);
        break;
      case "Reporting current position.":
        this.handlePositionReport(from);
        break;
      case "Reporting an emergency situation.":
        this.handleEmergencyReport(from);
        break;
      case "Requesting taxi to runway.":
        this.handleTaxiRequest(from);
        break;
      case "Reporting maintenance status.":
        this.handleMaintenanceStatus(from);
        break;
      case "Requesting refueling.":
        this.handleRefuelingRequest(from);
        break;
      case "Reporting fuel status.":
        this.handleFuelStatusReport(from);
        break;
      case "Requesting runway conditions.":
        this.handleRunwayConditionRequest(from);
        break;
      default:
        this.notify("Message received.", from);
    }
  }

  notifyAll(message: string): void {
    for (const airplane of this.airplanes) {
      this.notify(message, airplane);
    }
  }

  notify(message: string, to: Airplane): void {
    console.log(`Notifying ${to.name}: ${message}`);

    to.receive(message);
  }
}

// Concrete Colleague
class Boeing implements Airplane {
  name: string;
  private readonly controlTower: ControlTower;

  constructor(name: string, controlTower: ControlTower) {
    this.name = name;
    this.controlTower = controlTower;
    controlTower.register(this);
  }

  requestLanding(): void {
    console.log(`${this.name} is requesting permission to land.`);

    this.controlTower.receive("Requesting permission to land.", this);
  }

  requestTakeoff(): void {
    console.log(`${this.name} is requesting permission to take off.`);

    this.controlTower.receive("Requesting permission to take off.", this);
  }

  requestTaxi(): void {
    console.log(`${this.name} is requesting permission to taxi.`);

    this.controlTower.receive("Requesting permission to taxi.", this);
  }

  reportPosition(): void {
    console.log(`${this.name} is reporting its position.`);

    this.controlTower.receive("Reporting position.", this);
  }

  reportEmergency(): void {
    console.log(`${this.name} is reporting an emergency.`);

    this.controlTower.receive("Reporting an emergency.", this);
  }

  reportMaintenanceStatus(): void {
    console.log(`${this.name} is reporting its maintenance status.`);

    this.controlTower.receive("Reporting maintenance status.", this);
  }

  requestFuel(): void {
    console.log(`${this.name} is requesting fuel.`);

    this.controlTower.receive("Requesting fuel.", this);
  }

  reportFuelStatus(): void {
    console.log(`${this.name} is reporting its fuel status.`);

    this.controlTower.receive("Reporting fuel status.", this);
  }

  requestRunwayConditions(): void {
    console.log(`${this.name} is requesting runway conditions.`);

    this.controlTower.receive("Requesting runway conditions.", this);
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

// Concrete Colleague
class Airbus implements Airplane {
  name: string;
  private readonly controlTower: ControlTower;

  constructor(name: string, controlTower: ControlTower) {
    this.name = name;
    this.controlTower = controlTower;
    controlTower.register(this);
  }

  requestLanding(): void {
    console.log(`${this.name} is requesting permission to land.`);

    this.controlTower.receive("Requesting permission to land.", this);
  }

  requestTakeoff(): void {
    console.log(`${this.name} is requesting permission to take off.`);

    this.controlTower.receive("Requesting permission to take off.", this);
  }

  requestTaxi(): void {
    console.log(`${this.name} is requesting permission to taxi.`);

    this.controlTower.receive("Requesting permission to taxi.", this);
  }

  reportPosition(): void {
    console.log(`${this.name} is reporting its position.`);

    this.controlTower.receive("Reporting position.", this);
  }

  reportEmergency(): void {
    console.log(`${this.name} is reporting an emergency.`);

    this.controlTower.receive("Reporting an emergency.", this);
  }

  reportMaintenanceStatus(): void {
    console.log(`${this.name} is reporting its maintenance status.`);
    
    this.controlTower.receive("Reporting maintenance status.", this);
  }

  requestFuel(): void {
    console.log(`${this.name} is requesting fuel.`);
    
    this.controlTower.receive("Requesting fuel.", this);
  }

  reportFuelStatus(): void {
    console.log(`${this.name} is reporting its fuel status.`);

    this.controlTower.receive("Reporting fuel status.", this);
  }

  requestRunwayConditions(): void {
    console.log(`${this.name} is requesting runway conditions.`);

    this.controlTower.receive("Requesting runway conditions.", this);
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

// Client
class MediatorClient {
  static main() {
    const controlTower = new JFKControlTower();

    const boeing: Airplane = new Boeing("Boeing 747", controlTower);
    const airbus: Airplane = new Airbus("Airbus A380", controlTower);

    boeing.requestLanding();

    controlTower.notify("Permission to land granted.", boeing);
  }
}

MediatorClient.main();

export {};
