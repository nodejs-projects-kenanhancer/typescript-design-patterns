class User {
  constructor(public name: string) {}

  showInfo() {
    return `User: ${this.name}`;
  }
}

abstract class UserDecorator extends User {
  private readonly decoratedUser: User;

  constructor(decoratedUser: User) {
    super(decoratedUser.name);
    this.decoratedUser = decoratedUser;
  }

  showInfo() {
    return this.decoratedUser.showInfo();
  }
}

class AddressableUser extends UserDecorator {
  private readonly street: string;
  private readonly city: string;

  constructor(decoratedUser: User, street: string, city: string) {
    super(decoratedUser);
    this.street = street;
    this.city = city;
  }

  showInfo() {
    return `${super.showInfo()}, Address Info: ${this.street}, ${this.city}`;
  }
}

class ContactableUser extends UserDecorator {
  private readonly email: string;
  private readonly phone: string;

  constructor(decoratedUser: User, email: string, phone: string) {
    super(decoratedUser);
    this.email = email;
    this.phone = phone;
  }

  showInfo() {
    return `${super.showInfo()}, Contact Info: ${this.email}, ${this.phone}`;
  }
}

(function () {
  const user = new User("Kelly");
  // user.showInfo();

  const addressableUser = new AddressableUser(user, "Cheese", "London");
  // addressableUser.showInfo();

  const contactableUser = new ContactableUser(
    addressableUser,
    "kh@kh.com",
    "111222333"
  );

  const userInfo = contactableUser.showInfo();

  console.log(userInfo);
})();

export {};
