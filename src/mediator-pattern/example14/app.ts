import { Airbus, Boeing } from "./domain/aggregates/airplane/entities";
import {
  Gate,
  JFKControlTower,
  Runway,
  RunwayStatus,
} from "./domain/aggregates/control-tower/entities";
import {
  RunwayCleaningStatus,
  RunwayConstructionStatus,
  RunwayLightStatus,
  RunwayMaintenanceStatus,
  RunwayOperationalStatus,
  RunwaySurfaceStatus,
  RunwayUsageStatus,
  RunwayVisibilityStatus,
} from "./domain/aggregates/control-tower/enums";
import {
  AirplaneOutgoingRequests
} from "./domain/shared/contracts";
import {
  GateStatus,
  LandingType,
  TakeoffType,
  WeatherCondition,
} from "./domain/shared/enums";
import { DefaultAirplaneResponseMappingVisitor } from "./domain/shared/mappers";

// Client
class MediatorClient {
  static main() {
    const commonStatus = new RunwayStatus(
      false,
      RunwaySurfaceStatus.DRY,
      RunwayLightStatus.ON,
      RunwayMaintenanceStatus.GOOD,
      RunwayVisibilityStatus.GOOD,
      RunwayConstructionStatus.CONSTRUCTION_COMPLETED,
      RunwayOperationalStatus.OPERATIONAL,
      RunwayUsageStatus.MODERATELY_ACTIVE,
      RunwayCleaningStatus.CLEAN,
      WeatherCondition.CLEAR
    );

    const runways = [
      new Runway(
        "Runway A1",
        50,
        3000,
        100,
        2500,
        true,
        false,
        true,
        false,
        commonStatus
      ),
      new Runway(
        "Runway B2",
        60,
        4000,
        120,
        3500,
        false,
        true,
        true,
        true,
        commonStatus
      ),
      new Runway(
        "Runway C3",
        55,
        3500,
        110,
        3000,
        true,
        true,
        false,
        true,
        commonStatus
      ),
    ];

    const gates = [
      new Gate("Gate A1", 100, GateStatus.AVAILABLE),
      new Gate("Gate B1", 150, GateStatus.AVAILABLE),
    ];

    const controlTower = new JFKControlTower(runways, gates);

    const responseMappingVisitor = new DefaultAirplaneResponseMappingVisitor();

    const boeing747: AirplaneOutgoingRequests = Boeing.createBoeing747(
      controlTower,
      responseMappingVisitor
    );

    const airbusA380: AirplaneOutgoingRequests = Airbus.createAirbusA380(
      controlTower,
      responseMappingVisitor
    );

    boeing747.requestLandingPermission("Runway A1", LandingType.Daytime);

    boeing747.requestTakeoffPermission("Runway B2", TakeoffType.STANDARD);

    airbusA380.requestLandingPermission("Runway C3", LandingType.Daytime);
    
    // controlTower.notifyAll("Thanks all");
  }
}

MediatorClient.main();

export { };

