import { ChatRoom, ChatUser } from "./domain/entities";
import { ChatMediator, User } from "./domain/entities/interfaces";

// Client
class MediatorClient {
  static main() {
    const chatRoom: ChatMediator = ChatRoom.Create("room1");

    const john: User = ChatUser.Create("01", "John", "john@example.com");
    chatRoom.addUser(john);

    const jane: User = ChatUser.Create("02", "Jane", "jane@example.com");
    chatRoom.addUser(jane);

    const bob: User = ChatUser.Create("03", "Bob", "bob@example.com");
    chatRoom.addUser(bob);

    john.sendMessage("Hello, Jane!", jane);
    bob.sendMessage("Hello, everyone!");

    chatRoom.removeUser(jane);
  }
}

MediatorClient.main();

export {};
