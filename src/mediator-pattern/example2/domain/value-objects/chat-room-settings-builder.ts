import { ChatRoomSettings } from "./chat-room-settings";

export class ChatRoomSettingsBuilder {
  private _isPrivate = false;
  private _maxUsers = 100;
  private _roomName = "Default Room Name";
  private _description = "Default Room Description";
  private _language = "English";
  private _theme = "Default";
  private _messageHistoryLimit = 100;
  private _restrictedWords: string[] = [];

  get isPrivate() {
    return this._isPrivate;
  }
  get maxUsers() {
    return this._maxUsers;
  }
  get roomName() {
    return this._roomName;
  }
  get description() {
    return this._description;
  }
  get language() {
    return this._language;
  }
  get theme() {
    return this._theme;
  }
  get messageHistoryLimit() {
    return this._messageHistoryLimit;
  }
  get restrictedWords() {
    return this._restrictedWords;
  }

  private constructor(
    isPrivate: boolean,
    maxUsers: number,
    roomName: string,
    description: string,
    language: string,
    theme: string,
    messageHistoryLimit: number,
    restrictedWords: string[]
  ) {
    this._isPrivate = isPrivate;
    this._maxUsers = maxUsers;
    this._roomName = roomName;
    this._description = description;
    this._language = language;
    this._theme = theme;
    this._messageHistoryLimit = messageHistoryLimit;
    this._restrictedWords = [...restrictedWords];
  }

  static Create() {
    return new ChatRoomSettingsBuilder(
      false,
      100,
      "Default Room Name",
      "Default Room Description",
      "English",
      "Default",
      10,
      []
    );
  }

  setPrivate(isPrivate: boolean): ChatRoomSettingsBuilder {
    this._isPrivate = isPrivate;
    return this;
  }

  setMaxUsers(maxUsers: number): ChatRoomSettingsBuilder {
    this._maxUsers = maxUsers;
    return this;
  }

  setRoomName(roomName: string): ChatRoomSettingsBuilder {
    this._roomName = roomName;
    return this;
  }

  setDescription(description: string): ChatRoomSettingsBuilder {
    this._description = description;
    return this;
  }

  setLanguage(language: string): ChatRoomSettingsBuilder {
    this._language = language;
    return this;
  }

  setTheme(theme: string): ChatRoomSettingsBuilder {
    this._theme = theme;
    return this;
  }

  setMessageHistoryLimit(limit: number): ChatRoomSettingsBuilder {
    this._messageHistoryLimit = limit;
    return this;
  }

  setRestrictedWords(words: string[]): ChatRoomSettingsBuilder {
    this._restrictedWords = words;
    return this;
  }

  build(): ChatRoomSettings {
    return ChatRoomSettings.CreateWithBuilder(this);
  }
}
