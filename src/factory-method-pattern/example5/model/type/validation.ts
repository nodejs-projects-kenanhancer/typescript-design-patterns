import { ToDTO } from ".";
import { BaseFieldDecorator } from "../../decorators";

export interface ValidationArguments<TFieldName, TFieldValue> {
  /**
   * Name of the object's property being validated.
   */
  fieldName: TFieldName;

  /**
   * Validating value.
   */
  fieldValue: TFieldValue;
}

export interface ValidationOptions<TFieldName, TFieldValue> {
  /**
   * Error message to be used on validation fail.
   * Message can be either string or a function that returns a string.
   */
  message?:
    | string
    | ((
        validationArguments: ValidationArguments<TFieldName, TFieldValue>
      ) => string);
}

export type DTOFieldValidatorType<T, K = ToDTO<T>> = {
  readonly [P in keyof K]: BaseFieldDecorator<K, P, K[P]>;
};

export type DTOValidatorType<T, K = ToDTO<T>> = {
  readonly validators?: DTOFieldValidatorType<K>;

  validate(data: K): void;
};
