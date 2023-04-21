import { CommandHistory } from "./command";
import { Light, Radio, Television } from "./receiver";
import { MobileApp, RemoteControl, VoiceAssistant, WallSwitch } from "./sender";

class CommandClient {
  static main() {
    // Receivers
    const light = new Light();

    const radio = new Radio();

    const television = new Television();

    // CommandManager
    const commandManager = new CommandHistory();

    // Receivers
    const remoteControlForLight = new RemoteControl(light, commandManager);

    const remoteControlForRadio = new RemoteControl(radio, commandManager);

    const remoteControlForTelevision = new RemoteControl(
      television,
      commandManager
    );

    const voiceAssistant = new VoiceAssistant(
      light,
      radio,
      television,
      commandManager
    );

    const wallSwitchForLight = new WallSwitch(light, commandManager);

    const wallSwitchForRadio = new WallSwitch(radio, commandManager);

    const wallSwitchForTelevision = new WallSwitch(television, commandManager);

    const mobileAppForLight = new MobileApp(light, commandManager);

    const mobileAppForRadio = new MobileApp(radio, commandManager);

    const mobileAppForTelevision = new MobileApp(television, commandManager);

    remoteControlForLight.pressOnButton();

    remoteControlForLight.pressOnButton();

    remoteControlForLight.pressOffButton();

    commandManager.undo();

    commandManager.redo();

    voiceAssistant.sayTurnOnRadio();

    wallSwitchForTelevision.flipUp();

    commandManager.undo();

    voiceAssistant.sayTurnOnTv();

    remoteControlForRadio.pressOffButton();
  }
}

CommandClient.main();

export {};
