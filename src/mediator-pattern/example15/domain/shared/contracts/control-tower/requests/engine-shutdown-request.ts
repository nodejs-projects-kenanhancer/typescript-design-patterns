import { AirplaneRequestType } from "../../../enums";
import { AirplaneMediator } from "../../airplane";

export type EngineShutdownRequest = {
  type: AirplaneRequestType.EngineShutdown;
  engineId: string;
  from: AirplaneMediator;
};
