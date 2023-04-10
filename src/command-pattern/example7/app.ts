interface OrderCommand {
  execute(): void;
}

// Receiver Contract
interface Cook {
  switchOn(): void;
  switchOff(): void;
}

// Receiver
class Chef {
  cookPasta() {
    console.log("Chef is cooking Pasta");
  }

  bakeCake() {
    console.log("Chef is baking Cake");
  }

  cookDinner() {
    console.log("Chef is cooking Dinner");
  }

  cookLunch() {
    console.log("Chef is cooking Lunch");
  }
}

class Waiter {
  private readonly order: Order;

  constructor(order: Order) {
    this.order = order;
  }

  takeOrder() {
    this.order.execute();
  }
}

// Command
class Order implements OrderCommand {
  private chef: Chef;
  private food: string;

  constructor(chef: Chef, food: string) {
    this.chef = chef;
    this.food = food;
  }

  execute(): void {
    if (this.food === "pasta") {
      this.chef.cookPasta();
    } else {
      this.chef.bakeCake();
    }
  }
}

class CommandClient {
  static main() {
    const chef = new Chef();

    const order = new Order(chef, "pasta");

    const waiter = new Waiter(order);

    waiter.takeOrder();
  }
}

export {};
