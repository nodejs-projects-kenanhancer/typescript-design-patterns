import {
  FieldNameType,
  ValidatorRecord,
  ValidatorType,
} from "../../decorators";

export class Validator<T> implements ValidatorType<T> {
  readonly validators?: ValidatorRecord<T>;

  private constructor(validators?: ValidatorRecord<T>) {
    this.validators = validators;
  }

  validate(data: T): void {
    if (this.validators) {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const fieldName = key as FieldNameType<T, keyof T>;

          const validator = this.validators[fieldName];

          if (validator) {
            validator.execute(fieldName as any, data[fieldName]);
          }
        }
      }
    }
  }

  static createInstance<T>(inputData: ValidatorRecord<T>): ValidatorType<T> {
    return new Validator(inputData);
  }

  static createDefaultInstance(): ValidatorType<any> {
    return new Validator();
  }
}
