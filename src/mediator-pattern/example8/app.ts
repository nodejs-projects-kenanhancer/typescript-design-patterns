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
enum AirplaneRequest {
  Landing,
  Takeoff,
  Position,
  Emergency,
  Taxi,
  Maintenance,
  Refueling,
  FuelStatus,
  RunwayCondition,
}

interface ControlTower {
  register(airplane: Airplane): void;
  receive(request: AirplaneRequest, from: Airplane): void;
  notifyAll(message: string): void;
  notify(message: string, to: Airplane): void;
}

interface Command {
  execute(from: Airplane, controlTower: ControlTower): void;
}

// Landing Command
class LandingCommand implements Command {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(
      `JFK Control Tower is handling landing request from ${from.name}`
    );

    controlTower.notify("Permission to land granted.", from);
  }
}

// Takeoff Command
class TakeoffCommand implements Command {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(
      `JFK Control Tower is handling takeoff request from ${from.name}`
    );

    controlTower.notify("Permission to take off granted.", from);
  }
}

// Position Command
class PositionCommand implements Command {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(
      `JFK Control Tower is handling position report from ${from.name}`
    );

    controlTower.notify("Position received.", from);
  }
}

// Emergency Command
class EmergencyCommand implements Command {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(
      `JFK Control Tower is handling emergency report from ${from.name}`
    );

    controlTower.notifyAll(`${from.name} is reporting an emergency situation.`);
  }
}

// Taxi Command
class TaxiCommand implements Command {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(`JFK Control Tower is handling taxi request from ${from.name}`);

    controlTower.notify("Taxi permission granted.", from);
  }
}

// Maintenance Command
class MaintenanceCommand implements Command {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(
      `JFK Control Tower is handling maintenance status from ${from.name}`
    );

    controlTower.notify("Maintenance status received.", from);
  }
}

// Refueling Command
class RefuelingCommand implements Command {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(
      `JFK Control Tower is handling refueling request from ${from.name}`
    );

    controlTower.notify("Refueling team is on its way.", from);
  }
}

// FuelStatus Command
class FuelStatusCommand implements Command {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(
      `JFK Control Tower is handling fuel status report from ${from.name}`
    );

    controlTower.notify("Fuel status acknowledged.", from);
  }
}

// RunwayCondition Command
class RunwayConditionCommand implements Command {
  execute(from: Airplane, controlTower: ControlTower): void {
    console.log(
      `JFK Control Tower is handling runway conditions request from ${from.name}`
    );

    controlTower.notify("Runway conditions are normal.", from);
  }
}

// Concrete Mediator
class JFKControlTower implements ControlTower {
  private readonly airplanes: Airplane[] = [];
  private readonly commands: Map<AirplaneRequest, Command>;

  constructor(commands: Map<AirplaneRequest, Command>) {
    this.commands = commands;
  }

  register(airplane: Airplane): void {
    this.airplanes.push(airplane);

    console.log(`JFK Control Tower registered ${airplane.name} Airplane.`);
  }

  receive(request: AirplaneRequest, from: Airplane): void {
    console.log(
      `JFK Control Tower received request ${AirplaneRequest[request]} from ${from.name}`
    );

    const command = this.commands.get(request);

    if (command) {
      command.execute(from, this);
    } else {
      console.log(
        `No command registered for request ${AirplaneRequest[request]}`
      );
    }
  }

  notifyAll(message: string): void {
    for (const airplane of this.airplanes) {
      this.notify(message, airplane);
    }
  }

  notify(message: string, to: Airplane): void {
    console.log(`JFK Control Tower is notifying ${to.name}: ${message}`);

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

// Client
class MediatorClient {
  static main() {
    const commands: Map<AirplaneRequest, Command> = new Map();
    commands.set(AirplaneRequest.Emergency, new EmergencyCommand());
    commands.set(AirplaneRequest.FuelStatus, new FuelStatusCommand());
    commands.set(AirplaneRequest.Landing, new LandingCommand());
    commands.set(AirplaneRequest.Maintenance, new MaintenanceCommand());
    commands.set(AirplaneRequest.Position, new PositionCommand());
    commands.set(AirplaneRequest.Refueling, new RefuelingCommand());
    commands.set(AirplaneRequest.RunwayCondition, new RunwayConditionCommand());
    commands.set(AirplaneRequest.Takeoff, new TakeoffCommand());
    commands.set(AirplaneRequest.Taxi, new TaxiCommand());

    const controlTower = new JFKControlTower(commands);

    const boeing: Airplane = new Boeing("Boeing 747", controlTower);
    const airbus: Airplane = new Airbus("Airbus A380", controlTower);

    boeing.requestLanding();

    controlTower.notifyAll("Thanks all");
  }
}

MediatorClient.main();

export {};
