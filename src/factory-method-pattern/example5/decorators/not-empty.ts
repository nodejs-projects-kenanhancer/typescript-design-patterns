import { BaseFieldDecorator } from "./base-field-decorator";
import { FieldNameType } from "./field-decorator";

export class NotEmpty<
  TRecord,
  TFieldName extends keyof TRecord
> extends BaseFieldDecorator<TRecord, TFieldName, string> {
  execute(
    fieldName: FieldNameType<TRecord, TFieldName, string>,
    fieldValue: string
  ): string {
    if (fieldValue === "") {
      throw new Error(`${fieldName} can't be empty string`);
    }

    return super.execute(fieldName, fieldValue);
  }
}
