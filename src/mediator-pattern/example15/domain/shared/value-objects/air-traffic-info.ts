import { AirTrafficType } from "../enums";

export class AirTrafficInfo {
  range: number;
  type: AirTrafficType;

  constructor(range: number, type: AirTrafficType) {
    this.range = range;
    this.type = type;
  }
}
