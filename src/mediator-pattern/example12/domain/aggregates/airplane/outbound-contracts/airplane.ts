import { AirplaneIncomingCommands } from "./airplane-incoming-commands";
import { AirplaneOutgoingReports } from "./airplane-outgoing-reports";
import { AirplaneOutgoingRequests } from "./airplane-outgoing-requests";

// Colleague interface
export interface Airplane
  extends AirplaneIncomingCommands,
    AirplaneOutgoingReports,
    AirplaneOutgoingRequests {
  name: string;
  size: number;
}
