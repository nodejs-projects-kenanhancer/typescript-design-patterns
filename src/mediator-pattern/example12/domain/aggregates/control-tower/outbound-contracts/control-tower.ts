import { Airplane } from "../../airplane/outbound-contracts";
import { ControlTowerIncomingReports } from "./control-tower-incoming-reports";
import { ControlTowerIncomingRequests } from "./control-tower-incoming-requests";
import { ControlTowerOutgoingCommands } from "./control-tower-outgoing-commands";

// Mediator interface
export interface ControlTower
  extends ControlTowerIncomingRequests,
    ControlTowerIncomingReports,
    ControlTowerOutgoingCommands {
  register(airplane: Airplane): void;
}
