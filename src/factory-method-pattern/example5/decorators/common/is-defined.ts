import type { FieldNameType, ValidationOptions } from "../../model/type";
import { BaseFieldDecorator } from "../base-field-decorator";

export class IsDefined<
  TRecord,
  TFieldName extends keyof TRecord
> extends BaseFieldDecorator<TRecord, TFieldName, any> {
  execute(
    fieldName: FieldNameType<TRecord, TFieldName, any>,
    fieldValue: any
  ): any {
    if (fieldValue === undefined || fieldValue === null) {
      this.throwError(
        fieldName,
        fieldValue,
        `${fieldName} should not be null or undefined`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}
