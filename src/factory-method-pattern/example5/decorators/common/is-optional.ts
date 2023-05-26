import type { FieldNameType } from "../../model/type";
import { BaseFieldDecorator } from "../base-field-decorator";

export class IsOptional<
  TRecord,
  TFieldName extends keyof TRecord
> extends BaseFieldDecorator<TRecord, TFieldName, any> {
  execute(
    fieldName: FieldNameType<TRecord, TFieldName, any>,
    fieldValue: any
  ): any {
    if (fieldValue !== undefined || fieldValue !== null) {
      this.throwError(
        fieldName,
        fieldValue,
        `${fieldName} should be null or undefined`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}
