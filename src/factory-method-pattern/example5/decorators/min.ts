import type {
  FieldNameType,
  TFieldNameFromValue,
  ValidationOptions,
} from "../model/type";
import { BaseFieldDecorator } from "./base-field-decorator";

export class Min<
  TRecord,
  TFieldName extends TFieldNameFromValue<TRecord, number>
> extends BaseFieldDecorator<TRecord, TFieldName, number> {
  private readonly minValue: number;

  constructor(
    minValue: number,
    nextFieldDecorator?: BaseFieldDecorator<TRecord, TFieldName, number>,
    validationOptions?: ValidationOptions<TFieldName, number>
  ) {
    super(nextFieldDecorator, validationOptions);

    this.minValue = minValue;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, number>,
    fieldValue: number
  ): number {
    if (fieldValue < this.minValue) {
      this.throwError(
        fieldName,
        fieldValue,
        `${fieldName} must not be less than ${this.minValue}`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}
