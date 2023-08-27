import { AirplaneIncomingResponse } from "../../airplane";
import { AirplaneResponseMappingVisitor } from "../../airplane-response-mapping-visitor";

export interface VisitableResponse {
  accept(visitor: AirplaneResponseMappingVisitor): AirplaneIncomingResponse;
}
