import type { FieldNameType, ValidationOptions } from "../../model/type";
import { BaseFieldDecorator } from "../base-field-decorator";

export class Length<
  TRecord,
  TFieldName extends keyof TRecord
> extends BaseFieldDecorator<TRecord, TFieldName, ArrayLike<any>> {
  private readonly min: number;
  private readonly max: number;

  constructor(
    min: number,
    max: number,
    nextFieldDecorator?: BaseFieldDecorator<
      TRecord,
      TFieldName,
      ArrayLike<any>
    >,
    validationOptions?: ValidationOptions<TFieldName, ArrayLike<any>>
  ) {
    super(nextFieldDecorator, validationOptions);

    this.min = min;
    this.max = max;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, ArrayLike<any>>,
    fieldValue: ArrayLike<any>
  ): ArrayLike<any> {
    if (fieldValue.length < this.min) {
      this.throwError(
        fieldName,
        fieldValue,
        `${fieldName} length must be longer than or equal to ${this.min}`
      );
    } else if (fieldValue.length > this.max) {
      this.throwError(
        fieldName,
        fieldValue,
        `${fieldName} length must be shorter than or equal to ${this.max}`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}
