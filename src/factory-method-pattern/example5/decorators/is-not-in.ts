import type { FieldNameType } from "../model/type";
import { BaseFieldDecorator } from "./base-field-decorator";

export class IsNotIn<
  TRecord,
  TFieldName extends keyof TRecord,
  TFieldValue,
  const TValues extends readonly TFieldValue[]
> extends BaseFieldDecorator<TRecord, TFieldName, TFieldValue> {
  private readonly deniedValues: TValues;

  constructor(
    deniedValues: TValues,
    nextFieldDecorator?: BaseFieldDecorator<TRecord, TFieldName, TFieldValue>
  ) {
    super(nextFieldDecorator);

    this.deniedValues = deniedValues;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, TFieldValue>,
    fieldValue: TFieldValue
  ): TFieldValue {
    if (this.deniedValues.some((value) => value === fieldValue)) {
      throw new Error(
        `${fieldName} should not be one of the following values: ${this.deniedValues}`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}
