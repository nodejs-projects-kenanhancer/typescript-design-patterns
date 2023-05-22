import { FieldDecorator, ValidatorType } from "../decorators";
import { COUNTRY_NAMES, RoleType, type CountryNames } from "./constant";

export interface Validator<T> {
  validate(data: T): void;
}

export class NameValidator implements FieldDecorator<UserInputDTO, "name"> {
  execute(fieldName: "name", fieldValue: string): string {
    throw new Error("Method not implemented.");
  }

  validate(userInput: UserInputDTO): void {
    const { name } = userInput;

    if (!name || name === "") {
      throw new Error(`Name can't be null or empty`);
    }
  }
}

export class AgeValidator implements Validator<UserInputDTO> {
  validate(userInput: UserInputDTO): void {
    const { age } = userInput;

    if (age < 18) {
      throw new Error("Age must be 18 or above");
    }
  }
}

export class EmailValidator implements Validator<UserInputDTO> {
  validate(userInput: UserInputDTO): void {
    const { email } = userInput;
    const regex = /^(.+)@(.+)$/g;

    if (!email.match(regex)) {
      throw new Error("Invalid email format");
    }
  }
}

export class PasswordValidator implements Validator<UserInputDTO> {
  validate(userInput: UserInputDTO): void {
    const { password } = userInput;

    if (password.length < 8) {
      throw new Error("Password must have at least 8 characters");
    }
  }
}

export class CountryValidator implements Validator<UserInputDTO> {
  validate(userInput: UserInputDTO): void {
    const { country } = userInput;

    if (!COUNTRY_NAMES.includes(country)) {
      throw new Error("Country cannot be null or empty");
    }
  }
}

export type UserInputDTO = Omit<Pick<User, keyof User>, "role">;

export class User {
  readonly name: string;
  readonly age: number;
  readonly email: string;
  readonly password: string;
  readonly country: CountryNames;
  readonly role: RoleType;

  private constructor(
    name: string,
    age: number,
    email: string,
    password: string,
    country: CountryNames,
    role: RoleType
  ) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.password = password;
    this.country = country;
    this.role = role;
  }

  static createUser(
    userInput: UserInputDTO,
    validator?: ValidatorType<UserInputDTO>
  ) {
    if (validator) {
      validator.validate(userInput);
    }

    const { name, age, country, email, password } = userInput;

    return new User(name, age, email, password, country, "Member");
  }

  static createMember(
    userInput: UserInputDTO,
    validator?: ValidatorType<UserInputDTO>
  ) {
    if (validator) {
      validator.validate(userInput);
    }

    const { name, age, country, email, password } = userInput;

    return new User(name, age, email, password, country, "Member");
  }

  static createModerator(
    userInput: UserInputDTO,
    validator?: ValidatorType<UserInputDTO>
  ) {
    if (validator) {
      validator.validate(userInput);
    }

    const { name, age, country, email, password } = userInput;

    return new User(name, age, email, password, country, "Moderator");
  }

  static createAdmin(
    userInput: UserInputDTO,
    validator?: ValidatorType<UserInputDTO>
  ) {
    if (validator) {
      validator.validate(userInput);
    }

    const { name, age, country, email, password } = userInput;

    return new User(name, age, email, password, country, "Admin");
  }

  static createSuperAdmin(
    userInput: UserInputDTO,
    validator?: ValidatorType<UserInputDTO>
  ) {
    if (validator) {
      validator.validate(userInput);
    }

    const { name, age, country, email, password } = userInput;

    return new User(name, age, email, password, country, "SuperAdmin");
  }

  static createEditor(
    userInput: UserInputDTO,
    validator?: ValidatorType<UserInputDTO>
  ) {
    if (validator) {
      validator.validate(userInput);
    }

    const { name, age, country, email, password } = userInput;

    return new User(name, age, email, password, country, "Editor");
  }

  static createGuest(
    userInput: UserInputDTO,
    validator?: ValidatorType<UserInputDTO>
  ) {
    if (validator) {
      validator.validate(userInput);
    }

    const { name, age, country, email, password } = userInput;

    return new User(name, age, email, password, country, "Guest");
  }
}
