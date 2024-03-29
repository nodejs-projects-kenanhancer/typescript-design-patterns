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

    const voiceAssistantForLight = new VoiceAssistant(light, commandManager);

    const voiceAssistantForRadio = new VoiceAssistant(radio, commandManager);

    const voiceAssistantForTelevision = new VoiceAssistant(
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

    voiceAssistantForRadio.sayTurnOn();

    wallSwitchForTelevision.flipUp();

    commandManager.undo();

    voiceAssistantForTelevision.sayTurnOn();

    remoteControlForRadio.pressOffButton();
  }
}

CommandClient.main();

export { };

