interface User {
  name: string;
  chatMediator: ChatMediator;

  sendMessage(message: string, toUser?: User): void;
  receiveMessage(message: string): void;
}

interface ChatMediator {
  addUser(user: User): void;
  showMessage(fromUser: User, message: string): void;
  showPrivateMessage(fromUser: User, toUser: User, message: string): void;
}

class ChatUser implements User {
  name: string;
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

  constructor(name: string) {
    this.name = name;
  }

  sendMessage(message: string, toUser?: User): void {
    console.log(`${this.name} send: ${message}`);

    if (toUser) {
      this.chatMediator.showPrivateMessage(this, toUser, message);
    } else {
      this.chatMediator.showMessage(this, message);
    }
  }

  receiveMessage(message: string): void {
    console.log(`${this.name} receives: ${message}`);
  }
}

class ChatRoom implements ChatMediator {
  private readonly users: User[] = [];

  addUser(user: User) {
    user.chatMediator = this;
    this.users.push(user);
  }

  showMessage(fromUser: User, message: string): void {
    this.users.forEach((toUser) => {
      if (toUser !== fromUser) {
        toUser.receiveMessage(message);
      }
    });
  }

  showPrivateMessage(fromUser: User, toUser: User, message: string): void {
    if (!this.users.includes(toUser)) {
      throw new Error(`${toUser.name} doesn't exists.`);
    }

    toUser.receiveMessage(message);
  }
}

// Client
class MediatorClient {
  static main() {
    const chatRoom: ChatMediator = new ChatRoom();

    const john: User = new ChatUser("John");
    chatRoom.addUser(john);

    const jane: User = new ChatUser("Jane");
    chatRoom.addUser(jane);

    const bob: User = new ChatUser("Bob");
    chatRoom.addUser(bob);

    john.sendMessage("Hello, Jane!", jane);
    bob.sendMessage("Hello, everyone!");
  }
}

MediatorClient.main();

export {};
