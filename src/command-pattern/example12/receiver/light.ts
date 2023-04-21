import { ToAction } from "../ToAction";
import { Dispatch, Reducer, useReducer } from "../reducer-utility";
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

type LightState = {
  readonly lightState: boolean;
  readonly brightnessState: number;
};

const LightInitialState: LightState = {
  lightState: false,
  brightnessState: 0,
};

type LightAction = ToAction<LightState>;

const lightReducer: Reducer<LightState, LightAction> = (prevState, action) => {
  const { type } = action;

  switch (type) {
    case "SET_LIGHT_STATE":
      return { ...prevState, lightState: action.value };
    case "SET_BRIGHTNESS_STATE":
      return { ...prevState, brightnessState: action.value };
    default: {
      const exhaustiveCheck: never = type;
      throw new Error(`Unrecognized Action Type ${exhaustiveCheck}`);
    }
  }
};

export class Light implements Switchable, Dimmable {
  private readonly state: LightState;
  private readonly dispatch: Dispatch<LightAction>;

  get value() {
    return this.state.brightnessState;
  }

  constructor() {
    const reducer = useReducer(lightReducer, LightInitialState);

    this.state = reducer[0];
    this.dispatch = reducer[1];
    // [this.state, this.dispatch] = useReducer(lightReducer, LightInitialState);
  }

  switchOn(): void {
    if (this.state.lightState) {
      console.log(LIGHT_MESSAGES.ALREADY_ON_WARNING);
    } else {
      this.dispatch({ type: "SET_LIGHT_STATE", value: true });
      console.log(LIGHT_MESSAGES.ON);
    }
  }

  switchOff(): void {
    if (this.state.lightState) {
      this.dispatch({ type: "SET_LIGHT_STATE", value: false });
      console.log(LIGHT_MESSAGES.OFF);
    } else {
      console.log(LIGHT_MESSAGES.ALREADY_OFF_WARNING);
    }
  }

  up(): void {
    if (this.state.brightnessState <= 100) {
      this.dispatch({
        type: "SET_BRIGHTNESS_STATE",
        value: this.state.brightnessState + 1,
      });
      console.log(LIGHT_MESSAGES.BRIGHTNESS_UP + this.state.brightnessState);
    } else {
      console.log(LIGHT_MESSAGES.BRIGHTNESS_MAX_WARNING);
    }
  }

  down(): void {
    if (this.state.brightnessState >= 0) {
      this.dispatch({
        type: "SET_BRIGHTNESS_STATE",
        value: this.state.brightnessState - 1,
      });
      console.log(LIGHT_MESSAGES.BRIGHTNESS_DOWN + this.state.brightnessState);
    } else {
      console.log(LIGHT_MESSAGES.BRIGHTNESS_MIN_WARNING);
    }
  }
}
