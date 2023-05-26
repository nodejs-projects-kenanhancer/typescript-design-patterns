import type {
  FieldNameType,
  TFieldNameFromValue,
  ValidationOptions,
} from "../../model/type";
import { BaseFieldDecorator } from "../base-field-decorator";

export type MinDateValue = Date | (() => Date);

export class MinDate<
  TRecord,
  TFieldName extends TFieldNameFromValue<TRecord, Date>
> extends BaseFieldDecorator<TRecord, TFieldName, Date> {
  private readonly minDate: MinDateValue;

  constructor(
    minDate: MinDateValue,
    nextFieldDecorator?: BaseFieldDecorator<TRecord, TFieldName, Date>,
    validationOptions?: ValidationOptions<TFieldName, Date>
  ) {
    super(nextFieldDecorator, validationOptions);

    this.minDate = minDate;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, Date>,
    fieldValue: Date
  ): Date {
    const minDate =
      this.minDate instanceof Date ? this.minDate : this.minDate();
    if (fieldValue.getTime() < minDate.getTime()) {
      this.throwError(
        fieldName,
        fieldValue,
        `minimum allowed date ${fieldName} is ${minDate}`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}
