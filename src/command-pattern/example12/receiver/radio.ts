import { Dimmable } from "./dimmable";
import { Mutable } from "./mutable";
import { Switchable } from "./switchable";

const RADIO_ON = "The radio is on!";
const RADIO_OFF = "The radio is off!";
const RADIO_ALREADY_ON_WARNING = "The radio is already turned on!";
const RADIO_ALREADY_OFF_WARNING = "The radio is already turned off!";

const RADIO_VOLUME_UP = "The radio volume is increased to ";
const RADIO_VOLUME_DOWN = "The radio volume is increased to ";
const RADIO_VOLUME_MAX_WARNING = "The radio volume is already maximum!";
const RADIO_VOLUME_MIN_WARNING = "The radio volume is already minimum!";
const RADIO_MUTE = "The radio is muted!";
const RADIO_UNMUTE = "The radio is unmuted!";

class RadioState {
  radioState: boolean = false;
  volumeState: number = 0;
  muteState: boolean = false;

  constructor(
    radioState: boolean = false,
    volumeState: number = 0,
    muteState: boolean = false
  ) {
    this.radioState = radioState;
    this.volumeState = volumeState;
    this.muteState = muteState;
  }
}

export class Radio implements Switchable, Dimmable, Mutable {
  private state: RadioState = new RadioState();

  get value() {
    return this.state.volumeState;
  }

  switchOn(): void {
    if (this.state.radioState) {
      console.log(RADIO_ALREADY_ON_WARNING);
    } else {
      this.state.radioState = true;
      console.log(RADIO_ON);
    }
  }

  switchOff(): void {
    if (this.state.radioState) {
      this.state.radioState = false;
      console.log(RADIO_OFF);
    } else {
      console.log(RADIO_ALREADY_OFF_WARNING);
    }
  }

  up(): void {
    if (this.state.volumeState <= 100) {
      this.state.volumeState = this.state.volumeState + 1;
      console.log(RADIO_VOLUME_UP + this.state.volumeState);
    } else {
      console.log(RADIO_VOLUME_MAX_WARNING);
    }
  }

  down(): void {
    if (this.state.volumeState >= 0) {
      this.state.volumeState = this.state.volumeState - 1;
      console.log(RADIO_VOLUME_DOWN + this.state.volumeState);
    } else {
      console.log(RADIO_VOLUME_MIN_WARNING);
    }
  }

  mute(): void {
    if (this.state.muteState) {
      this.state.muteState = false;
      console.log(RADIO_UNMUTE);
    } else {
      this.state.muteState = true;
      console.log(RADIO_MUTE);
    }
  }
}
