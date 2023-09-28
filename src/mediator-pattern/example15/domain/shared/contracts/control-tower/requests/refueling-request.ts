import { AirplaneRequestType } from "../../../enums";
import { FuelInfo } from "../../../value-objects";
import { AirplaneMediator } from "../../airplane";

export type RefuelingRequest = {
  type: AirplaneRequestType.Refueling;
  fuelInfo: FuelInfo;
  from: AirplaneMediator;
};
