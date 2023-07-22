import { Airplane, Airbus, Boeing } from "./domain/entities/colleague";
import { JFKControlTower } from "./domain/entities/mediator/jfk-control-tower";
import {
  AirplaneRequest,
  ControlTower,
  ControlTowerCommand,
  EmergencyCommand,
  FuelStatusCommand,
  LandingCommand,
  MaintenanceCommand,
  PositionCommand,
  RefuelingCommand,
  RunwayConditionCommand,
  TakeoffCommand,
  TaxiCommand,
} from "./domain/entities/mediator";

// Client
class MediatorClient {
  static main() {
    const commands: Map<AirplaneRequest, ControlTowerCommand> = new Map();
    commands.set(AirplaneRequest.Emergency, new EmergencyCommand());
    commands.set(AirplaneRequest.FuelStatus, new FuelStatusCommand());
    commands.set(AirplaneRequest.Landing, new LandingCommand());
    commands.set(AirplaneRequest.Maintenance, new MaintenanceCommand());
    commands.set(AirplaneRequest.Position, new PositionCommand());
    commands.set(AirplaneRequest.Refueling, new RefuelingCommand());
    commands.set(AirplaneRequest.RunwayCondition, new RunwayConditionCommand());
    commands.set(AirplaneRequest.Takeoff, new TakeoffCommand());
    commands.set(AirplaneRequest.Taxi, new TaxiCommand());

    const controlTower: ControlTower = new JFKControlTower(commands);

    const boeing: Airplane = new Boeing("Boeing 747", controlTower);
    const airbus: Airplane = new Airbus("Airbus A380", controlTower);

    boeing.requestLanding();

    controlTower.notifyAll("Thanks all");
  }
}

MediatorClient.main();

export {};
