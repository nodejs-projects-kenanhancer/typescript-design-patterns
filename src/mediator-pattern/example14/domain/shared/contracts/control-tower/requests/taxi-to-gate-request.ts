import { AirplaneRequestType, TaxiSpeed } from "../../../enums";
import { AirplaneMediator } from "../../airplane";

export type TaxiToGateRequest = {
  type: AirplaneRequestType.TaxiToGate;
  gateId: string;
  taxiSpeed: TaxiSpeed;
  from: AirplaneMediator;
};
