import {
  Airbus,
  Airplane,
  AirplaneService,
  AirplaneMediatorService,
  Boeing,
} from "./domain/entities/colleague";
import {
  AirplaneRequest,
  ControlTower,
  ControlTowerCommand,
  EmergencyCommand,
  FuelStatusCommand,
  JFKControlTower,
  LandingCommand,
  MaintenanceCommand,
  PositionCommand,
  RefuelingCommand,
  RunwayConditionCommand,
  TakeoffCommand,
  TaxiCommand,
  ReceiveFlightPlanCommand,
  ReceiveWeatherUpdateCommand,
  ReceivePassengerCountCommand,
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
    commands.set(
      AirplaneRequest.WeatherUpdate,
      new ReceiveWeatherUpdateCommand()
    );
    commands.set(AirplaneRequest.FlightPlan, new ReceiveFlightPlanCommand());
    commands.set(
      AirplaneRequest.PassengerCount,
      new ReceivePassengerCountCommand()
    );

    const controlTower: ControlTower = new JFKControlTower(commands);

    const airplaneService: AirplaneService = new AirplaneMediatorService(
      controlTower
    );

    const boeing: Airplane = new Boeing("Boeing 747", airplaneService);
    const airbus: Airplane = new Airbus("Airbus A380", airplaneService);

    boeing.requestLanding();

    boeing.receiveWeatherUpdate("");
    boeing.receiveFlightPlan("");
    boeing.receivePassengerCount(300);

    controlTower.notifyAll("Thanks all");
  }
}

MediatorClient.main();

export {};
