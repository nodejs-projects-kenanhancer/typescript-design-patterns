import { BaseFieldDecorator } from "./base-field-decorator";
import type { FieldNameType } from "../model/type";

export class IsEmpty<
  TRecord,
  TFieldName extends keyof TRecord
> extends BaseFieldDecorator<TRecord, TFieldName, string> {
  execute(
    fieldName: FieldNameType<TRecord, TFieldName, string>,
    fieldValue: string
  ): string {
    if (
      fieldValue !== "" ||
      (fieldValue !== null && fieldValue !== undefined)
    ) {
      throw new Error(`${fieldName} must be empty string`);
    }

    return super.execute(fieldName, fieldValue);
  }
}
