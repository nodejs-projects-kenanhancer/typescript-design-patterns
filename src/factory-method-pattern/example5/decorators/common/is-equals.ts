import type { FieldNameType, ValidationOptions } from "../../model/type";
import { BaseFieldDecorator } from "../base-field-decorator";

export class IsEquals<
  TRecord,
  TFieldName extends keyof TRecord
> extends BaseFieldDecorator<TRecord, TFieldName, any> {
  private readonly comparison: any;

  constructor(
    comparison: any,
    nextFieldDecorator?: BaseFieldDecorator<TRecord, TFieldName, any>,
    validationOptions?: ValidationOptions<TFieldName, any>
  ) {
    super(nextFieldDecorator, validationOptions);

    this.comparison = comparison;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, any>,
    fieldValue: any
  ): any {
    if (fieldValue !== this.comparison) {
      this.throwError(
        fieldName,
        fieldValue,
        `${fieldName} must be equal to ${this.comparison}`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}
