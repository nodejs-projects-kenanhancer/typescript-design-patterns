import { BaseFieldDecorator } from "./base-field-decorator";
import { FieldDecorator, FieldNameType } from "./field-decorator";

export class DeniedValues<
  TRecord,
  TFieldName extends keyof TRecord,
  TFieldValue,
  const TValues extends readonly TFieldValue[]
> extends BaseFieldDecorator<TRecord, TFieldName, TFieldValue> {
  private readonly deniedValues: TValues;

  constructor(
    deniedValues: TValues,
    nextFieldDecorator?: FieldDecorator<TRecord, TFieldName, TFieldValue>
  ) {
    super(nextFieldDecorator);

    this.deniedValues = deniedValues;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, TFieldValue>,
    fieldValue: TFieldValue
  ): TFieldValue {
    if (this.deniedValues.includes(fieldValue)) {
      throw new Error(`${fieldName} can't be one of [${this.deniedValues}]`);
    }

    return super.execute(fieldName, fieldValue);
  }
}
