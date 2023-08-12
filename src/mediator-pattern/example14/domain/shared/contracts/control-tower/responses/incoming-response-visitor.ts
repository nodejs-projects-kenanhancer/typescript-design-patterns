import { AirplaneIncomingResponse } from "../../airplane";
import { AirplaneResponseMappingVisitor } from "../../airplane-response-mapping-visitor";

export interface IncomingResponseVisitor {
  accept(visitor: AirplaneResponseMappingVisitor): AirplaneIncomingResponse;
}
