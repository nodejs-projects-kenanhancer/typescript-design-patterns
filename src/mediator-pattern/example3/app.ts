// class ChatUser {
//   id: number;
//   name: string;
//   email: string;
//   joinedAt?: Date;
//   leftAt?: Date;

//   constructor(id: number, name: string, email: string) {
//     this.id = id;
//     this.name = name;
//     this.email = email;
//   }
// }

// interface ChatMediator {
//   addUser(user: ChatUser): void;
//   removeUser(user: ChatUser): void;
//   notifyUsers(fromUser: ChatUser, message: string): void;
//   notifyUser(fromUser: ChatUser, toUser: ChatUser, message: string): void;
// }

// class ChatRoom implements ChatMediator {
//   private readonly users: ChatUser[] = [];

//   addUser(user: ChatUser) {
//     const isUserExist = this.users.includes(user);
//     if (isUserExist) {
//       return console.log(`${user.name} is already registered.`);
//     }

//     this.notifyUsers(
//       user,
//       `has joined the chat at ${user.joinedAt}`
//     );

//     user.joinedAt = new Date();
//     user.chatMediator = this;
//     this.users.push(user);
//   }

//   removeUser(user: ChatUser): void {
//     const index = this.users.findIndex((u) => u.id === user.id);

//     if (index !== -1) {
//       user.leftAt = new Date();
//       this.users.splice(index, 1);
//       this.notifyUsers(
//         user,
//         `has left the chat at ${user.leftAt}`
//       );
//     }
//   }

//   sendMessage(message: string, toUser?: ChatUser): void {
//     console.log(`${this.name} send: ${message}`);

//     if (toUser) {
//       this.chatMediator.notifyUser(this, toUser, message);
//     } else {
//       this.chatMediator.notifyUsers(this, message);
//     }
//   }

//   receiveMessage(message: string, fromUser: ChatUser): void {
//     console.log(
//       `${this.name} received a message from ${fromUser.name}: ${message}`
//     );
//   }

//   notifyUsers(fromUser: User, message: string): void {
//     this.users.forEach((toUser) => {
//       if (toUser !== fromUser) {
//         toUser.receiveMessage(message, fromUser);
//       }
//     });
//   }

//   notifyUser(fromUser: User, toUser: User, message: string): void {
//     if (!this.users.includes(toUser)) {
//       throw new Error(`${toUser.name} doesn't exists.`);
//     }

//     toUser.receiveMessage(message, fromUser);
//   }
// }

// class ChatService {
//   private _chatMediator: ChatMediator;

//   get chatMediator() {
//     if (this._chatMediator === undefined) {
//       throw new Error(`${this.name} is not in any chat room`);
//     }

//     return this._chatMediator;
//   }

//   set chatMediator(chatMediator: ChatMediator) {
//     this._chatMediator = chatMediator;
//   }

//   constructor(chatMediator: ChatMediator) {
//     this.chatMediator = chatMediator;
//   }

//   addUser(user: ChatUser): void {
//     throw new Error("Method not implemented.");
//   }

//   removeUser(user: ChatUser): void {
//     throw new Error("Method not implemented.");
//   }

//   sendMessage(message: string, toUser?: ChatUser): void {
//     console.log(`${this.name} send: ${message}`);

//     if (toUser) {
//       this.chatMediator.notifyUser(this, toUser, message);
//     } else {
//       this.chatMediator.notifyUsers(this, message);
//     }
//   }

//   receiveMessage(message: string, fromUser: ChatUser): void {
//     console.log(
//       `${this.name} received a message from ${fromUser.name}: ${message}`
//     );
//   }
// }

// // Client
// class MediatorClient {
//   static main() {
//     const chatRoom: ChatMediator = new ChatRoom();

//     const chatService = new ChatService(chatRoom);

//     const john = new ChatUser(1, "John", "john@example.com");
//     chatRoom.addUser(john);

//     const jane = new ChatUser(2, "Jane", "jane@example.com");
//     chatRoom.addUser(jane);

//     const bob = new ChatUser(3, "Bob", "bob@example.com");
//     chatRoom.addUser(bob);

//     chatServicel;
//   }
// }

// MediatorClient.main();

// export {};
