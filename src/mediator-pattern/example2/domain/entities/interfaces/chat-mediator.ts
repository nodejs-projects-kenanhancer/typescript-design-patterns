import { User } from "./user";
import { ChatRoomSettings } from "../../value-objects";

export interface ChatMediator {
  readonly roomId: string;
  readonly settings: ChatRoomSettings;

  addUser(user: User): void;
  removeUser(user: User): void;
  notifyUsers(fromUser: User, message: string): void;
  notifyUser(fromUser: User, toUser: User, message: string): void;
}
