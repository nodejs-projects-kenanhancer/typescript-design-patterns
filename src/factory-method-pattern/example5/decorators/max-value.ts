import { BaseFieldDecorator } from "./base-field-decorator";
import { FieldDecorator, FieldNameType } from "./field-decorator";

export class MaxValue<
  TRecord,
  TFieldName extends keyof TRecord
> extends BaseFieldDecorator<TRecord, TFieldName, number> {
  private readonly maxValue: number;

  constructor(
    maxValue: number,
    nextFieldDecorator?: FieldDecorator<TRecord, TFieldName, number>
  ) {
    super(nextFieldDecorator);

    this.maxValue = maxValue;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, number>,
    fieldValue: number
  ): number {
    if (fieldValue > this.maxValue) {
      throw new Error(`${fieldName} can't be greater than ${this.maxValue}`);
    }

    return super.execute(fieldName, fieldValue);
  }
}
