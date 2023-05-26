import type { FieldNameType } from "../../model/type";
import { BaseFieldDecorator } from "../base-field-decorator";

export class ArrayEvery<
  TRecord,
  TFieldName extends keyof TRecord,
  TFieldValue,
  const TValues extends readonly TFieldValue[]
> extends BaseFieldDecorator<TRecord, TFieldName, Array<any>> {
  private readonly allowedValues: TValues;

  constructor(
    allowedValues: TValues,
    nextFieldDecorator?: BaseFieldDecorator<TRecord, TFieldName, Array<any>>
  ) {
    super(nextFieldDecorator);

    this.allowedValues = allowedValues;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, Array<any>>,
    fieldValue: Array<any>
  ): Array<any> {
    if (!this.allowedValues.every((value) => fieldValue.indexOf(value))) {
      this.throwError(
        fieldName,
        fieldValue,
        `${fieldName} must contain ${this.allowedValues} values`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}
