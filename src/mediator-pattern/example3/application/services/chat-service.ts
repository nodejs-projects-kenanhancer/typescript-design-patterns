import { ChatRoom, ChatUser } from "../../domain/entities";
import { ChatRoomSettings } from "../../domain/value-objects";

export class ChatService {
  private readonly chatRooms: Map<string, ChatRoom> = new Map();

  private isChatRoomAvailable(roomId: string) {
    return this.chatRooms.has(roomId);
  }

  private validateChatRoomIdAvailability(roomId: string) {
    const isChatRoomAvailable = this.isChatRoomAvailable(roomId);
    if (!isChatRoomAvailable) {
      throw new Error(`${roomId} chat room doesn't exists.`);
    }
  }

  private validateChatRoomIdOnCreating(roomId: string) {
    const isChatRoomAvailable = this.isChatRoomAvailable(roomId);
    if (isChatRoomAvailable) {
      throw new Error(`${roomId} chat room already exists.`);
    }
  }

  private onChatRoomCreated(chatRoom: ChatRoom) {
    const { roomId } = chatRoom;

    this.chatRooms.set(roomId, chatRoom);

    console.log(`${roomId} chat room is created.`);
  }

  create(roomId: string) {
    this.validateChatRoomIdOnCreating(roomId);

    const chatRoom = ChatRoom.Create(roomId);

    this.onChatRoomCreated(chatRoom);

    return chatRoom;
  }

  createForTopic(topic: string) {
    const roomId = ChatRoom.GenerateRoomIdForTopic(topic);

    return this.create(roomId);
  }

  createWithCustomSettings(roomId: string, settings: ChatRoomSettings) {
    this.validateChatRoomIdOnCreating(roomId);

    const chatRoom = ChatRoom.CreateWithCustomSettings(roomId, settings);

    this.onChatRoomCreated(chatRoom);

    return chatRoom;
  }

  delete(roomId: string) {
    this.validateChatRoomIdAvailability(roomId);

    this.chatRooms.delete(roomId);

    console.log(`${roomId} chat room is removed.`);
  }

  deleteForTopic(topic: string) {
    const roomId = ChatRoom.GenerateRoomIdForTopic(topic);

    this.delete(roomId);
  }

  get(roomId: string) {
    this.validateChatRoomIdAvailability(roomId);

    return this.chatRooms.get(roomId);
  }

  addUserToChatRoom(
    roomId: string,
    userId: string,
    name: string,
    email: string
  ) {
    const chatRoom = this.get(roomId);

    const user = ChatUser.Create(userId, name, email);

    chatRoom.addUser(user);
  }

  deleteUserFromChatRoom(roomId: string, userId: string) {
    const chatRoom = this.get(roomId);

    chatRoom.deleteUser(userId);
  }

  sendMessage(
    roomId: string,
    fromUserId: string,
    message: string,
    toUserId: string
  ) {
    const chatRoom = this.get(roomId);

    chatRoom.notifyUser(fromUserId, message, toUserId);
  }

  broadcastMessage(roomId: string, fromUserId: string, message: string) {
    const chatRoom = this.get(roomId);

    chatRoom.notifyUsers(fromUserId, message);
  }
}
