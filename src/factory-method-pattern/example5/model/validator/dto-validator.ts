import type {
  DTOFieldValidatorType,
  DTOValidatorType,
  FieldNameType,
} from "../type";
import { ToDTO } from "../type";

export class DTOValidator<T> implements DTOValidatorType<T> {
  readonly validator?: DTOFieldValidatorType<T>;

  private constructor(validator?: DTOFieldValidatorType<T>) {
    this.validator = validator;
  }

  validate(dto: T): void {
    if (this.validator) {
      for (const key in dto) {
        if (Object.prototype.hasOwnProperty.call(dto, key)) {
          const fieldName = key as FieldNameType<T, keyof ToDTO<T>>;

          if (this.validator) {
            const validator = this.validator[fieldName];

            if (validator) {
              validator.execute(fieldName as any, dto[fieldName]);
            }
          }
        }
      }
    }
  }

  static createInstance<T>(
    inputData: DTOFieldValidatorType<T>
  ): DTOValidatorType<T> {
    return new DTOValidator(inputData);
  }

  static createDefaultInstance<T>(): DTOValidatorType<T> {
    return new DTOValidator();
  }
}
