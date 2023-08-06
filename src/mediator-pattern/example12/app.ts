import { RunwayStatus } from "./domain/shared/enums";
import { Runway } from "./domain/shared/value-objects";
import { Airbus, Boeing } from "./domain/aggregates/airplane/entities";
import { Airplane } from "./domain/aggregates/airplane/outbound-contracts";
import { JFKControlTower } from "./domain/aggregates/control-tower/entities";
import { ControlTower } from "./domain/aggregates/control-tower/outbound-contracts";

// Client
class MediatorClient {
  static main() {
    const runways = [
      new Runway("Runway 1", RunwayStatus.Available, 3),
      new Runway("Runway 2", RunwayStatus.Available, 2),
      new Runway("Runway 3", RunwayStatus.Available, 1),
    ];

    const controlTower: ControlTower = new JFKControlTower(runways);

    const boeing: Airplane = new Boeing("Boeing 747", 2, controlTower);
    const airbus: Airplane = new Airbus("Airbus A380", 3, controlTower);

    boeing.requestLanding();

    boeing.requestAirTraffic();

    boeing.requestEmergencyLand();

    // controlTower.notifyAll("Thanks all");
  }
}

MediatorClient.main();

export {};
