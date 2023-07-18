import { ChatMediator } from "./chat-mediator";

export interface User {
  id: string;
  name: string;
  email: string;
  joinedAt?: Date;
  leftAt?: Date;
  chatMediator: ChatMediator;

  sendMessage(message: string, toUser?: User): void;
  receiveMessage(message: string, fromUser: User): void;
}
