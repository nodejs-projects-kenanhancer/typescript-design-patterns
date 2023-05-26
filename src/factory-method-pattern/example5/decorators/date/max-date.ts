import type {
  FieldNameType,
  TFieldNameFromValue,
  ValidationOptions,
} from "../../model/type";
import { BaseFieldDecorator } from "../base-field-decorator";

export type MaxDateValue = Date | (() => Date);

export class MaxDate<
  TRecord,
  TFieldName extends TFieldNameFromValue<TRecord, Date>
> extends BaseFieldDecorator<TRecord, TFieldName, Date> {
  private readonly maxDate: MaxDateValue;

  constructor(
    maxDate: MaxDateValue,
    nextFieldDecorator?: BaseFieldDecorator<TRecord, TFieldName, Date>,
    validationOptions?: ValidationOptions<TFieldName, Date>
  ) {
    super(nextFieldDecorator, validationOptions);

    this.maxDate = maxDate;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, Date>,
    fieldValue: Date
  ): Date {
    const maxDate =
      this.maxDate instanceof Date ? this.maxDate : this.maxDate();
    if (fieldValue.getTime() > maxDate.getTime()) {
      this.throwError(
        fieldName,
        fieldValue,
        `maximum allowed date ${fieldName} is ${maxDate}`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}
