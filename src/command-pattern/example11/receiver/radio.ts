import { Switchable } from "./switchable";

// Receiver
export class Radio implements Switchable {
  switchOn(): void {
    console.log("The radio is on");
  }

  switchOff(): void {
    console.log("The radio is off");
  }
}
