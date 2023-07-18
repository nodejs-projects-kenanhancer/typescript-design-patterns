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

  private isUserAvailable(userId: string) {
    return this.users.some((u) => u.id === userId);
  }

  private validateChatUserIdAvailability(userId: string) {
    const isChatUserAvailable = this.isUserAvailable(userId);
    if (!isChatUserAvailable) {
      throw new Error(`${userId} user doesn't exists.`);
    }
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

    user.joinedAt = new Date();
    user.chatMediator = this;
    this.users.push(user);

    this.notifyUsers(user.id, `has joined the chat at ${user.joinedAt}`);
  }

  deleteUser(userId: string): void {
    const user = this.getUser(userId);

    const index = this.users.indexOf(user);

    user.leftAt = new Date();
    this.users.splice(index, 1);
    
    this.notifyUsers(userId, `has left the chat at ${user.leftAt}`);
  }

  getUser(userId: string) {
    this.validateChatUserIdAvailability(userId);

    return this.users.find((u) => u.id === userId);
  }

  notifyUsers(fromUserId: string, message: string): void {
    const fromUser = this.getUser(fromUserId);

    this.users.forEach((toUser) => {
      if (toUser !== fromUser) {
        toUser.receiveMessage(message, fromUser);
      }
    });
  }

  notifyUser(fromUserId: string, message: string, toUserId: string): void {
    const fromUser = this.getUser(fromUserId);
    const toUser = this.getUser(toUserId);

    toUser.receiveMessage(message, fromUser);
  }
}
