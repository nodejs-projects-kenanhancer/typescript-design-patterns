import { User, ChatMediator } from "./interfaces";
import { ChatRoomSettings } from "../value-objects";

export class ChatRoom implements ChatMediator {
  readonly roomId: string;
  readonly settings: ChatRoomSettings;
  private readonly users: User[] = [];

  private constructor(roomId: string, settings: ChatRoomSettings) {
    this.roomId = roomId;
    this.settings = settings;
  }

  static Create(roomId: string) {
    return this.CreateWithCustomSettings(
      roomId,
      ChatRoomSettings.CreateDefault()
    );
  }

  static CreateForTopic(topic: string) {
    if (!this.IsValidTopic(topic)) {
      throw new Error(`Invalid topic: ${topic}`);
    }

    const roomId = this.GenerateRoomIdForTopic(topic);

    return this.Create(roomId);
  }

  static CreateWithCustomSettings(roomId: string, settings: ChatRoomSettings) {
    if (!this.IsValidRoomId) {
      throw new Error(`Invalid room ID: ${roomId}`);
    }

    return new ChatRoom(roomId, settings);
  }

  static GenerateRoomIdForTopic(topic: string) {
    // Replace this with your actual ID generation logic
    return `topic-${topic}`;
  }

  private static IsValidRoomId(roomId: string) {
    // Replace this with your actual validation logic
    return roomId.length > 0;
  }

  private static IsValidTopic(topic: string) {
    // Replace this with your actual validation logic
    return topic.length > 0;
  }

  addUser(user: User) {
    const isUserExist = this.users.includes(user);
    if (isUserExist) {
      throw new Error(`${user.name} user is already registered.`);
    }

    const { maxUsers } = this.settings;
    if (this.users.length >= maxUsers) {
      throw new Error(`This chat room is full. Max users: ${maxUsers}`);
    }

    this.notifyUsers(user, `has joined the chat at ${user.joinedAt}`);

    user.joinedAt = new Date();
    user.chatMediator = this;
    this.users.push(user);
  }

  removeUser(user: User): void {
    const index = this.users.findIndex((u) => u.id === user.id);

    if (index === -1) {
      throw new Error(`${user.name} user doesn't exists.`);
    }

    user.leftAt = new Date();
    this.users.splice(index, 1);
    this.notifyUsers(user, `has left the chat at ${user.leftAt}`);
  }

  notifyUsers(fromUser: User, message: string): void {
    const isUserExist = this.users.includes(fromUser);
    if (!isUserExist) {
      throw new Error(`${fromUser.name} user doesn't exists.`);
    }

    this.users.forEach((toUser) => {
      if (toUser !== fromUser) {
        toUser.receiveMessage(message, fromUser);
      }
    });
  }

  notifyUser(fromUser: User, toUser: User, message: string): void {
    const isUserExist = this.users.includes(toUser);
    if (!isUserExist) {
      throw new Error(`${toUser.name} user doesn't exists.`);
    }

    toUser.receiveMessage(message, fromUser);
  }
}
