import { AirplaneSpecification, AirplaneStatus } from "../../value-objects";

export interface Airplane {
  name: string;
  specification: AirplaneSpecification;
  status: AirplaneStatus;
}
