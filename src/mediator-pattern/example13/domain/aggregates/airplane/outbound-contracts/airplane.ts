import { AirplaneIncomingCommands } from "./airplane-incoming-commands";
import { AirplaneOutgoingRequests } from "./airplane-outgoing-requests";

// Colleague interface
export interface Airplane
  extends AirplaneIncomingCommands,
    AirplaneOutgoingRequests {
  name: string;
}
