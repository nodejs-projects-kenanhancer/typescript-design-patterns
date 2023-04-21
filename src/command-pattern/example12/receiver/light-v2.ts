import { Dimmable } from "./dimmable";
import { Switchable } from "./switchable";

const LIGHT_MESSAGES = {
  ON: "The light is on!",
  OFF: "The light is off!",
  ALREADY_ON_WARNING: "The light is already turned on!",
  ALREADY_OFF_WARNING: "The light is already turned off!",

  BRIGHTNESS_UP: "The light brightness is increased to ",
  BRIGHTNESS_DOWN: "The light brightness is increased to ",
  BRIGHTNESS_MAX_WARNING: "The light brightness is already maximum!",
  BRIGHTNESS_MIN_WARNING: "The light brightness is already minimum!",
} as const;

// Good usage
class LightState {
  readonly lightState: boolean;
  readonly brightnessState: number;

  private constructor(
    lightState: boolean = false,
    brightnessState: number = 0
  ) {
    this.lightState = lightState;
    this.brightnessState = brightnessState;
  }

  static createInstance(
    lightState: boolean = false,
    brightnessState: number = 0
  ) {
    return new LightState(lightState, brightnessState);
  }

  static createFromInstance(instance: LightState) {
    const { lightState, brightnessState } = instance;

    return new LightState(lightState, brightnessState);
  }
}

export class LightV2 implements Switchable, Dimmable {
  private state: LightState = LightState.createInstance();

  get value() {
    return this.state.brightnessState;
  }

  switchOn(): void {
    if (this.state.lightState) {
      console.log(LIGHT_MESSAGES.ALREADY_ON_WARNING);
    } else {
      this.state = LightState.createFromInstance({
        ...this.state,
        lightState: true,
      });
      console.log(LIGHT_MESSAGES.ON);
    }
  }

  switchOff(): void {
    if (this.state.lightState) {
      this.state = LightState.createFromInstance({
        ...this.state,
        lightState: false,
      });
      console.log(LIGHT_MESSAGES.OFF);
    } else {
      console.log(LIGHT_MESSAGES.ALREADY_OFF_WARNING);
    }
  }

  up(): void {
    if (this.state.brightnessState <= 100) {
      this.state = LightState.createFromInstance({
        ...this.state,
        brightnessState: this.state.brightnessState + 1,
      });
      console.log(LIGHT_MESSAGES.BRIGHTNESS_UP + this.state.brightnessState);
    } else {
      console.log(LIGHT_MESSAGES.BRIGHTNESS_MAX_WARNING);
    }
  }

  down(): void {
    if (this.state.brightnessState >= 0) {
      this.state = LightState.createFromInstance({
        ...this.state,
        brightnessState: this.state.brightnessState - 1,
      });
      console.log(LIGHT_MESSAGES.BRIGHTNESS_DOWN + this.state.brightnessState);
    } else {
      console.log(LIGHT_MESSAGES.BRIGHTNESS_MIN_WARNING);
    }
  }
}
