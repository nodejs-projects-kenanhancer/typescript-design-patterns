import { User } from "./user";
import { ChatRoomSettings } from "../../value-objects";

export interface ChatMediator {
  readonly roomId: string;
  readonly settings: ChatRoomSettings;

  addUser(user: User): void;
  deleteUser(userId: string): void;
  notifyUsers(fromUserId: string, message: string): void;
  notifyUser(fromUserId: string, message: string, toUserId: string): void;
}
