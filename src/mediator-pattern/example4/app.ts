// this is not implementing mediator pattern

class Logger {
  addMessage(message: string) {
    console.log(message);
  }
}

class Person {
  name: string;
  readonly logger: Logger;

  constructor(name: string, logger: Logger) {
    this.name = name;
    this.logger = logger;
  }

  eat(food: string) {
    this.logger.addMessage(`${this.name} is eating ${food}`);
  }

  sleep(hours: number) {
    this.logger.addMessage(`${this.name} is sleeping for ${hours} hours`);
  }

  work(hours: number) {
    this.logger.addMessage(`${this.name} is working for ${hours} hours`);
  }

  play(game: string) {
    this.logger.addMessage(`${this.name} is playing ${game}`);
  }
}

// Client
class Client {
  static main() {
    const logger = new Logger();

    const john = new Person("John", logger);

    john.eat("pizza");
    john.sleep(7);
    john.work(5);
    john.play("chess");
  }
}

Client.main();

export {};
