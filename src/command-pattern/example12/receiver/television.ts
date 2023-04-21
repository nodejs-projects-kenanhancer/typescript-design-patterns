import { Dimmable } from "./dimmable";
import { Mutable } from "./mutable";
import { Switchable } from "./switchable";

const TELEVISION_ON = "The television is on!";
const TELEVISION_OFF = "The television is off!";
const TELEVISION_ALREADY_ON_WARNING = "The television is already turned on!";
const TELEVISION_ALREADY_OFF_WARNING = "The television is already turned off!";

const TELEVISION_VOLUME_UP = "The television volume is increased to ";
const TELEVISION_VOLUME_DOWN = "The television volume is increased to ";
const TELEVISION_VOLUME_MAX_WARNING =
  "The television volume is already maximum!";
const TELEVISION_VOLUME_MIN_WARNING =
  "The television volume is already minimum!";
const TELEVISION_MUTE = "The television is muted!";
const TELEVISION_UNMUTE = "The television is unmuted!";

class TelevisionState {
  televisionState: boolean = false;
  volumeState: number = 0;
  muteState: boolean = false;

  constructor(
    televisionState: boolean = false,
    volumeState: number = 0,
    muteState: boolean = false
  ) {
    this.televisionState = televisionState;
    this.volumeState = volumeState;
    this.muteState = muteState;
  }
}

export class Television implements Switchable, Dimmable, Mutable {
  private state: TelevisionState = new TelevisionState();

  get value() {
    return this.state.volumeState;
  }

  switchOn(): void {
    if (this.state.televisionState) {
      console.log(TELEVISION_ALREADY_ON_WARNING);
    } else {
      this.state.televisionState = true;
      console.log(TELEVISION_ON);
    }
  }

  switchOff(): void {
    if (this.state.televisionState) {
      this.state.televisionState = false;
      console.log(TELEVISION_OFF);
    } else {
      console.log(TELEVISION_ALREADY_OFF_WARNING);
    }
  }

  up(): void {
    if (this.state.volumeState <= 100) {
      this.state.volumeState = this.state.volumeState + 1;
      console.log(TELEVISION_VOLUME_UP + this.state.volumeState);
    } else {
      console.log(TELEVISION_VOLUME_MAX_WARNING);
    }
  }

  down(): void {
    if (this.state.volumeState >= 0) {
      this.state.volumeState = this.state.volumeState - 1;
      console.log(TELEVISION_VOLUME_DOWN + this.state.volumeState);
    } else {
      console.log(TELEVISION_VOLUME_MIN_WARNING);
    }
  }

  mute(): void {
    if (this.state.muteState) {
      this.state.muteState = false;
      console.log(TELEVISION_UNMUTE);
    } else {
      this.state.muteState = true;
      console.log(TELEVISION_MUTE);
    }
  }
}
