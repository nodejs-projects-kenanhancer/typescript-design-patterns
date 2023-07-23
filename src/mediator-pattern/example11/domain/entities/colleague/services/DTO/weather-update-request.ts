import { Airplane } from "../../airplane";
import { AirplaneRequest } from "../../../mediator";

export interface WeatherUpdateRequest {
  type: AirplaneRequest.WeatherUpdate;
  weatherUpdate: string;
  from: Airplane;
}
