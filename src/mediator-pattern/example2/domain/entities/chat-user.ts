import { User, ChatMediator } from "./interfaces";

export class ChatUser implements User {
  id: number;
  name: string;
  email: string;
  joinedAt?: Date;
  leftAt?: Date;
  private _chatMediator: ChatMediator;

  get chatMediator() {
    if (this._chatMediator === undefined) {
      throw new Error(`${this.name} is not in any chat room`);
    }

    return this._chatMediator;
  }

  set chatMediator(chatMediator: ChatMediator) {
    this._chatMediator = chatMediator;
  }

  private constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static Create(id: number, name: string, email: string) {
    return new ChatUser(id, name, email);
  }

  sendMessage(message: string, toUser?: User): void {
    console.log(`${this.name} send: ${message}`);

    if (toUser) {
      this.chatMediator.notifyUser(this, toUser, message);
    } else {
      this.chatMediator.notifyUsers(this, message);
    }
  }

  receiveMessage(message: string, fromUser: User): void {
    console.log(
      `${this.name} received a message from ${fromUser.name}: ${message}`
    );
  }
}
