import type { FieldNameType, ValidationOptions } from "../../model/type";
import { BaseFieldDecorator } from "../base-field-decorator";

export class MinLength<
  TRecord,
  TFieldName extends keyof TRecord
> extends BaseFieldDecorator<TRecord, TFieldName, ArrayLike<any>> {
  private readonly min: number;

  constructor(
    min: number,
    nextFieldDecorator?: BaseFieldDecorator<
      TRecord,
      TFieldName,
      ArrayLike<any>
    >,
    validationOptions?: ValidationOptions<TFieldName, ArrayLike<any>>
  ) {
    super(nextFieldDecorator, validationOptions);

    this.min = min;
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
    }

    return super.execute(fieldName, fieldValue);
  }
}
