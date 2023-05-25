import { BaseFieldDecorator } from "./base-field-decorator";
import type { FieldNameType } from "../model/type";

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
