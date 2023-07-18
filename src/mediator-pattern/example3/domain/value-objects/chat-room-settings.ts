import { ChatRoomSettingsBuilder } from "./chat-room-settings-builder";

export class ChatRoomSettings {
  readonly isPrivate: boolean;
  readonly maxUsers: number;
  readonly roomName: string;
  readonly description: string;
  readonly language: string;
  readonly theme: string;
  readonly messageHistoryLimit: number;
  readonly restrictedWords: string[];

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
    this.isPrivate = isPrivate;
    this.maxUsers = maxUsers;
    this.roomName = roomName;
    this.description = description;
    this.language = language;
    this.theme = theme;
    this.messageHistoryLimit = messageHistoryLimit;
    this.restrictedWords = [...restrictedWords];
  }

  static CreateDefault() {
    return new ChatRoomSettings(
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

  static CreateBuilder() {
    return this.CreateDefault();
  }

  static CreateWithBuilder(builder: ChatRoomSettingsBuilder) {
    return new ChatRoomSettings(
      builder.isPrivate,
      builder.maxUsers,
      builder.roomName,
      builder.description,
      builder.language,
      builder.theme,
      builder.messageHistoryLimit,
      builder.restrictedWords
    );
  }
}
