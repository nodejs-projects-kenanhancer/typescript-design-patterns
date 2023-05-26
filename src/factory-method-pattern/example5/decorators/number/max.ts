import type {
  FieldNameType,
  TFieldNameFromValue,
  ValidationOptions,
} from "../../model/type";
import { BaseFieldDecorator } from "../base-field-decorator";

export class Max<
  TRecord,
  TFieldName extends TFieldNameFromValue<TRecord, number>
> extends BaseFieldDecorator<TRecord, TFieldName, number> {
  private readonly maxValue: number;

  constructor(
    maxValue: number,
    nextFieldDecorator?: BaseFieldDecorator<TRecord, TFieldName, number>,
    validationOptions?: ValidationOptions<TFieldName, number>
  ) {
    super(nextFieldDecorator, validationOptions);

    this.maxValue = maxValue;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, number>,
    fieldValue: number
  ): number {
    if (fieldValue > this.maxValue) {
      this.throwError(
        fieldName,
        fieldValue,
        `${fieldName} must be greater than or equal to ${this.maxValue}`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}
