interface Bike {
  getDescription(): string;
  getPrice(): number;
}

class AliminiumBike implements Bike {
  getDescription(): string {
    return "Aliminium Bike";
  }

  getPrice(): number {
    return 100;
  }
}

class CarbonBike implements Bike {
  getDescription(): string {
    return "Carbon Bikee";
  }

  getPrice(): number {
    return 1000;
  }
}

abstract class BikeAccessory implements Bike {
  private readonly bike: Bike;

  constructor(bike: Bike) {
    this.bike = bike;
  }

  getDescription(): string {
    return this.bike.getDescription();
  }

  getPrice(): number {
    return this.bike.getPrice();
  }
}

class SecurityPackage extends BikeAccessory {
  constructor(bike: Bike) {
    super(bike);
  }

  getDescription(): string {
    return super.getDescription() + ", Security Package";
  }

  getPrice(): number {
    return super.getPrice() + 1;
  }
}

class SportPackge extends BikeAccessory {
  constructor(bike: Bike) {
    super(bike);
  }

  getDescription(): string {
    return super.getDescription() + ", Sport Package";
  }

  getPrice(): number {
    return super.getPrice() + 10;
  }
}

(function () {
  const bike = new SportPackge(new SecurityPackage(new AliminiumBike()));

  console.log(`Bike: '${bike.getDescription()}' Cost: '${bike.getPrice()}'`);
})();

export {};
