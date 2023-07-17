interface User {
  id: number;
  name: string;
  email: string;
  joinedAt?: Date;
  leftAt?: Date;
  chatMediator: ChatMediator;

  sendMessage(message: string, toUser?: User): void;
  receiveMessage(message: string, fromUser: User): void;
}

interface ChatMediator {
  addUser(user: User): void;
  removeUser(user: User): void;
  notifyUsers(fromUser: User, message: string): void;
  notifyUser(fromUser: User, toUser: User, message: string): void;
}

class ChatUser implements User {
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

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
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

class ChatRoom implements ChatMediator {
  private readonly users: User[] = [];

  addUser(user: User) {
    const isUserExist = this.users.includes(user);
    if (isUserExist) {
      return console.log(`${user.name} is already registered.`);
    }

    this.notifyUsers(
      user,
      `has joined the chat at ${user.joinedAt}`
    );

    user.joinedAt = new Date();
    user.chatMediator = this;
    this.users.push(user);
  }

  removeUser(user: User): void {
    const index = this.users.findIndex((u) => u.id === user.id);

    if (index !== -1) {
      user.leftAt = new Date();
      this.users.splice(index, 1);
      this.notifyUsers(
        user,
        `has left the chat at ${user.leftAt}`
      );
    }
  }

  notifyUsers(fromUser: User, message: string): void {
    this.users.forEach((toUser) => {
      if (toUser !== fromUser) {
        toUser.receiveMessage(message, fromUser);
      }
    });
  }

  notifyUser(fromUser: User, toUser: User, message: string): void {
    if (!this.users.includes(toUser)) {
      throw new Error(`${toUser.name} doesn't exists.`);
    }

    toUser.receiveMessage(message, fromUser);
  }
}

// Client
class MediatorClient {
  static main() {
    const chatRoom: ChatMediator = new ChatRoom();

    const john: User = new ChatUser(1, "John", "john@example.com");
    chatRoom.addUser(john);

    const jane: User = new ChatUser(2, "Jane", "jane@example.com");
    chatRoom.addUser(jane);

    const bob: User = new ChatUser(3, "Bob", "bob@example.com");
    chatRoom.addUser(bob);

    john.sendMessage("Hello, Jane!", jane);
    bob.sendMessage("Hello, everyone!");

    chatRoom.removeUser(jane);
  }
}

MediatorClient.main();

export {};
