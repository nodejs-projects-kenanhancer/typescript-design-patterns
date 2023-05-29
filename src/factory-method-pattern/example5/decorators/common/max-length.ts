import type { FieldNameType, ValidationOptions } from "../../model/type";
import { BaseFieldDecorator } from "../base-field-decorator";

export class MaxLength<
  TRecord,
  TFieldName extends keyof TRecord
> extends BaseFieldDecorator<TRecord, TFieldName, ArrayLike<any>> {
  private readonly max: number;

  constructor(
    max: number,
    nextFieldDecorator?: BaseFieldDecorator<
      TRecord,
      TFieldName,
      ArrayLike<any>
    >,
    validationOptions?: ValidationOptions<TFieldName, ArrayLike<any>>
  ) {
    super(nextFieldDecorator, validationOptions);

    this.max = max;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, ArrayLike<any>>,
    fieldValue: ArrayLike<any>
  ): ArrayLike<any> {
    if (fieldValue.length > this.max) {
      this.throwError(
        fieldName,
        fieldValue,
        `${fieldName} length must be shorter than or equal to ${this.max}`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}
