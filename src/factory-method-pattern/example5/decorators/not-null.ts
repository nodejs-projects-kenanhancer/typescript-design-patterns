import { BaseFieldDecorator } from "./base-field-decorator";
import { FieldNameType } from "./field-decorator";

export class NotNull<
  TRecord,
  TFieldName extends keyof TRecord
> extends BaseFieldDecorator<TRecord, TFieldName, any> {
  execute(fieldName: FieldNameType<TRecord, TFieldName, any>, fieldValue: any) {
    if (!fieldValue) {
      throw new Error(`${fieldName} can't be null`);
    }

    return super.execute(fieldName, fieldValue);
  }
}
