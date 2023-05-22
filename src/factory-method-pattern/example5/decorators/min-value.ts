import { BaseFieldDecorator } from "./base-field-decorator";
import { FieldDecorator, FieldNameType } from "./field-decorator";

export class MinValue<
  TRecord,
  TFieldName extends keyof TRecord
> extends BaseFieldDecorator<TRecord, TFieldName, number> {
  private readonly minValue: number;

  constructor(
    minValue: number,
    nextFieldDecorator?: FieldDecorator<TRecord, TFieldName, number>
  ) {
    super(nextFieldDecorator);

    this.minValue = minValue;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, number>,
    fieldValue: number
  ): number {
    if (fieldValue < this.minValue) {
      throw new Error(`${fieldName} can't be less than ${this.minValue}`);
    }

    return super.execute(fieldName, fieldValue);
  }
}
