interface Order {
  execute(): void;
}

// Receiver
class StockTrade {
  buy() {
    console.log("You want to buy stocks");
  }

  sell() {
    console.log("You want to sell stocks");
  }
}

// Sender
class Agent {
  private readonly ordersQueue: Order[] = [];

  placeOrder(order: Order) {
    this.ordersQueue.push(order);
  }

  save() {
    this.ordersQueue.forEach((order) => order.execute());
  }
}

// Command
class BuyStockOrder implements Order {
  private readonly stock: StockTrade;

  constructor(stock: StockTrade) {
    this.stock = stock;
  }

  execute(): void {
    this.stock.buy();
  }
}

// Command
class SellStockOrder implements Order {
  private readonly stock: StockTrade;

  constructor(stock: StockTrade) {
    this.stock = stock;
  }

  execute(): void {
    this.stock.sell();
  }
}


// Client
class CommandClient {
  static main() {
    const stock = new StockTrade();
    const agent = new Agent();

    const bsc = new BuyStockOrder(stock);
    const ssc = new SellStockOrder(stock);

    agent.placeOrder(bsc);
    agent.placeOrder(ssc);

    agent.save();
  }
}

CommandClient.main();

export {};
