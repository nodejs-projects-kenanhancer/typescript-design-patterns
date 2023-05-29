import { MobilePhoneLocale, PHONE_FORMATS } from "../../model/constant/phones";
import { FieldNameType, ValidationOptions } from "../../model/type";
import { BaseFieldDecorator } from "../base-field-decorator";

export class IsMobilePhone<
  TRecord,
  TFieldName extends keyof TRecord
> extends BaseFieldDecorator<TRecord, TFieldName, string> {
  private readonly local: MobilePhoneLocale;

  constructor(
    local: MobilePhoneLocale,
    nextFieldDecorator?: BaseFieldDecorator<TRecord, TFieldName, string>,
    validationOptions?: ValidationOptions<TFieldName, string>
  ) {
    super(nextFieldDecorator, validationOptions);

    this.local = local;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, string>,
    fieldValue: string
  ): string {
    const phoneRegex = PHONE_FORMATS[this.local];

    if (!phoneRegex.test(fieldValue)) {
      this.throwError(
        fieldName,
        fieldValue,
        `${fieldName} must be a phone number with ${phoneRegex} format`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}
