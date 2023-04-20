import { Switchable } from "./switchable";

// Receiver
export class Light implements Switchable {
  switchOn(): void {
    console.log("The light is on");
  }
  switchOff(): void {
    console.log("The light is off");
  }
}
