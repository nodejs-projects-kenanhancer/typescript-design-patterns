import { ChatService } from "./application/services/chat-service";

// Client
class MediatorClient {
  static main() {
    const chatService = new ChatService();

    chatService.create("room1");

    chatService.addUserToChatRoom("room1", "01", "John", "john@example.com");

    chatService.addUserToChatRoom("room1", "02", "Jane", "jane@example.com");

    chatService.addUserToChatRoom("room1", "03", "Bob", "Bob@example.com");



    chatService.sendMessage("room1", "01", "Hello, Jane!", "02");

    chatService.broadcastMessage("room1", "03", "Hello, everyone!");

    chatService.delete("room1");
  }
}

MediatorClient.main();

export {};
