import { FieldNameType, TFieldNameFromValue } from "../../model/type";
import { BaseFieldDecorator } from "../base-field-decorator";

export class IsPositive<
  TRecord,
  TFieldName extends TFieldNameFromValue<TRecord, number>
> extends BaseFieldDecorator<TRecord, TFieldName, number> {
  execute(
    fieldName: FieldNameType<TRecord, TFieldName, number>,
    fieldValue: number
  ): number {
    if (fieldValue <= 0) {
      this.throwError(
        fieldName,
        fieldValue,
        `${fieldName} must be a positive number`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}
