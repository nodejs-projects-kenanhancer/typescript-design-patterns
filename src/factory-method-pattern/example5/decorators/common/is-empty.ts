import type { FieldNameType } from "../../model/type";
import { BaseFieldDecorator } from "../base-field-decorator";

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
      this.throwError(
        fieldName,
        fieldValue,
        `${fieldName} must be empty string`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}
