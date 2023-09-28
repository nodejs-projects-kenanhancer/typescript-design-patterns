import { AirplaneResponseVisitor } from "../../airplane-response-visitor";

export interface VisitableResponse<TResponse> {
  accept(visitor: AirplaneResponseVisitor): TResponse;
}
