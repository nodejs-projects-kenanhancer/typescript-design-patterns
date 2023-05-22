import { BaseFieldDecorator } from "./base-field-decorator";
import { FieldDecorator, FieldNameType } from "./field-decorator";

export class Length<
  TRecord,
  TFieldName extends keyof TRecord
> extends BaseFieldDecorator<TRecord, TFieldName, ArrayLike<any>> {
  private readonly length: number;

  constructor(
    length: number,
    nextFieldDecorator: FieldDecorator<TRecord, TFieldName, ArrayLike<any>>
  ) {
    super(nextFieldDecorator);

    this.length = length;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, ArrayLike<any>>,
    fieldValue: ArrayLike<any>
  ): ArrayLike<any> {
    if (fieldValue.length > this.length) {
      throw new Error(
        `${fieldName} length can't be greater than ${this.length}`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}
