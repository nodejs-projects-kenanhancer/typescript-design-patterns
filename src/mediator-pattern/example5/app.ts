type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

interface Dispatchable<TListener extends FunctionProperties<TListener>> {
  dispatch<
    TKeys extends keyof TListener,
    TParameters extends Parameters<TListener[TKeys]>
  >(
    eventName: TKeys,
    ...parameters: TParameters
  ): void;
}

class Dispatcher<TListener extends FunctionProperties<TListener>>
  implements Dispatchable<TListener>
{
  private readonly listener: TListener;

  private constructor(listener: TListener) {
    this.listener = listener;
  }

  dispatch<
    TKeys extends keyof TListener,
    TParameters extends Parameters<TListener[TKeys]>
  >(eventName: TKeys, ...parameters: TParameters): void {
    const func = this.listener[eventName] as Function;

    if (!func) {
      throw new Error(`${String(eventName)} event doesn't exists.`);
    }

    func.apply(this.listener, parameters);
  }

  static Create<TListener extends FunctionProperties<TListener>>(
    listener: TListener
  ): Dispatchable<TListener> {
    return new Dispatcher(listener);
  }
}

class Person {
  name: string;
  readonly dispatcher: Dispatchable<PersonListener>;

  constructor(name: string, dispatcher: Dispatchable<PersonListener>) {
    this.name = name;
    this.dispatcher = dispatcher;
  }

  eat(food: string) {
    this.dispatcher.dispatch("validateEatParameters", food);

    this.dispatcher.dispatch("logEatAction", food, this);
  }

  sleep(hours: number) {
    this.dispatcher.dispatch("validateSleepParameters", hours);

    this.dispatcher.dispatch("logSleepAction", hours, this);
  }

  work(hours: number) {
    this.dispatcher.dispatch("validateWorkParameters", hours);

    this.dispatcher.dispatch("logWorkAction", hours, this);
  }

  play(game: string) {
    this.dispatcher.dispatch("validatePlayParameters", game);

    this.dispatcher.dispatch("logPlayAction", game, this);
  }
}

class PersonListener {
  validateEatParameters(food: string) {
    if (food.length === 0) {
      throw new Error("food parameter can't be empty");
    }
  }

  logEatAction(food: string, person: Person) {
    console.log(`${person.name} is eating ${food}`);
  }

  validateSleepParameters(hours: number) {
    if (hours <= 0) {
      throw new Error("hours parameter can't be less than 1");
    }
  }

  logSleepAction(hours: number, person: Person) {
    console.log(`${person.name} is sleeping for ${hours} hours`);
  }

  validateWorkParameters(hours: number) {
    if (hours <= 0) {
      throw new Error("hours parameter can't be less than 1");
    }
  }

  logWorkAction(hours: number, person: Person) {
    console.log(`${person.name} is working for ${hours} hours`);
  }

  validatePlayParameters(game: string) {
    if (game.length === 0) {
      throw new Error("game parameter can't be empty");
    }
  }

  logPlayAction(game: string, person: Person) {
    console.log(`${person.name} is playing ${game}`);
  }
}

// Client
class Client {
  static main() {
    const dispatcher = Dispatcher.Create(new PersonListener());

    const john = new Person("John", dispatcher);

    john.eat("pizza");
    john.sleep(7);
    john.work(5);
    john.play("chess");
  }
}

Client.main();

export {};
