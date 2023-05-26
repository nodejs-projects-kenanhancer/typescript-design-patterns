import type {
  FieldDecorator,
  FieldNameType,
  ValidationOptions,
} from "../../model/type";
import { BaseFieldDecorator } from "../base-field-decorator";

export class Validate<
  TRecord,
  TFieldName extends keyof TRecord
> extends BaseFieldDecorator<TRecord, TFieldName, any> {
  private readonly constraint: FieldDecorator<TRecord, TFieldName, any>;

  constructor(
    constraint: FieldDecorator<TRecord, TFieldName, any>,
    nextFieldDecorator?: BaseFieldDecorator<TRecord, TFieldName, any>,
    validationOptions?: ValidationOptions<TFieldName, any>
  ) {
    super(nextFieldDecorator, validationOptions);

    this.constraint = constraint;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, any>,
    fieldValue: any
  ): any {
    this.constraint.execute(fieldName, fieldValue);

    // if (fieldValue !== this.comparison) {
    //   this.throwError(
    //     fieldName,
    //     fieldValue,
    //     `${fieldName} must be equal to ${this.comparison}`
    //   );
    // }

    return super.execute(fieldName, fieldValue);
  }
}
