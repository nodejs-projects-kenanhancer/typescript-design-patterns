import { Dimmable } from "./dimmable";
import { Switchable } from "./switchable";

const LIGHT_MESSAGES = {
  ON: "The light is on!",
  OFF: "The light is off!",
  ALREADY_ON_WARNING: "The light is already turned on!",
  ALREADY_OFF_WARNING: "The light is already turned off!",

  BRIGHTNESS_UP: "The light brightness is increased to ",
  BRIGHTNESS_DOWN: "The light brightness is increased to ",
  BRIGHTNESS_MAX_ERROR: "The light brightness can be maximum 100!",
  BRIGHTNESS_MIN_ERROR: "The light brightness can be minimum 0!",
} as const;

// Bad usage
class LightState {
  private _lightState: boolean = false;
  private _brightnessState: number = 0;

  constructor(lightState: boolean = false, brightnessState: number = 0) {
    this.lightState = lightState;
    this.brightnessState = brightnessState;
  }

  get lightState() {
    return this._lightState;
  }

  set lightState(lightState: boolean) {
    this._lightState = lightState;
  }

  get brightnessState() {
    return this._brightnessState;
  }

  set brightnessState(brightnessState: number) {
    if (brightnessState > 100) {
      throw new Error(LIGHT_MESSAGES.BRIGHTNESS_MAX_ERROR);
    } else if (brightnessState < 0) {
      new Error(LIGHT_MESSAGES.BRIGHTNESS_MIN_ERROR);
    }

    this._brightnessState = brightnessState;
  }
}

export class LightV3 implements Switchable, Dimmable {
  private state: LightState = new LightState();

  get value() {
    return this.state.brightnessState;
  }

  switchOn(): void {
    if (this.state.lightState) {
      console.log(LIGHT_MESSAGES.ALREADY_ON_WARNING);
    } else {
      this.state.lightState = true;
      console.log(LIGHT_MESSAGES.ON);
    }
  }

  switchOff(): void {
    if (this.state.lightState) {
      this.state.lightState = false;
      console.log(LIGHT_MESSAGES.OFF);
    } else {
      console.log(LIGHT_MESSAGES.ALREADY_OFF_WARNING);
    }
  }

  up(): void {
    this.state.brightnessState = this.state.brightnessState + 1;
    console.log(LIGHT_MESSAGES.BRIGHTNESS_UP + this.state.brightnessState);
  }

  down(): void {
    this.state.brightnessState = this.state.brightnessState - 1;
    console.log(LIGHT_MESSAGES.BRIGHTNESS_DOWN + this.state.brightnessState);
  }
}
