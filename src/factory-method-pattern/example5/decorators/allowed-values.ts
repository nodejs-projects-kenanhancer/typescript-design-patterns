import { BaseFieldDecorator } from "./base-field-decorator";
import { FieldDecorator, FieldNameType } from "./field-decorator";

export class AllowedValues<
  TRecord,
  TFieldName extends keyof TRecord,
  TFieldValue,
  const TValues extends readonly TFieldValue[]
> extends BaseFieldDecorator<TRecord, TFieldName, TFieldValue> {
  private readonly allowedValues: TValues;

  constructor(
    allowedValues: TValues,
    nextFieldDecorator?: FieldDecorator<TRecord, TFieldName, TFieldValue>
  ) {
    super(nextFieldDecorator);

    this.allowedValues = allowedValues;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, TFieldValue>,
    fieldValue: TFieldValue
  ): TFieldValue {
    if (!this.allowedValues.includes(fieldValue)) {
      throw new Error(`${fieldName} should be one of [${this.allowedValues}]`);
    }

    return super.execute(fieldName, fieldValue);
  }
}
