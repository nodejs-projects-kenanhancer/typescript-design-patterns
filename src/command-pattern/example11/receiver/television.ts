import { Switchable } from "./switchable";

// Receiver
export class Television implements Switchable {
  switchOn(): void {
    console.log("The television is on");
  }

  switchOff(): void {
    console.log("The television is off");
  }
}
