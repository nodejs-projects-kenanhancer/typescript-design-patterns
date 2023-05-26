import type { FieldNameType, ValidationOptions } from "../../model/type";
import { BaseFieldDecorator } from "../base-field-decorator";

export class IsIn<
  TRecord,
  TFieldName extends keyof TRecord,
  TFieldValue,
  const TValues extends readonly TFieldValue[]
> extends BaseFieldDecorator<TRecord, TFieldName, TFieldValue> {
  private readonly allowedValues: TValues;

  constructor(
    allowedValues: TValues,
    nextFieldDecorator?: BaseFieldDecorator<TRecord, TFieldName, TFieldValue>,
    validationOptions?: ValidationOptions<TFieldName, TFieldValue>
  ) {
    super(nextFieldDecorator, validationOptions);

    this.allowedValues = allowedValues;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, TFieldValue>,
    fieldValue: TFieldValue
  ): TFieldValue {
    if (!this.allowedValues.some((value) => value === fieldValue)) {
      this.throwError(
        fieldName,
        fieldValue,
        `${fieldName} must be one of the following values: ${this.allowedValues}`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}
