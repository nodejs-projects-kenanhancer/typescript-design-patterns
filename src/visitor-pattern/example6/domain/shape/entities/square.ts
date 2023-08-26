import { Rectangle } from ".";

export class Square extends Rectangle {
  constructor(public sideLength: number) {
    super(sideLength, sideLength);
  }
}
