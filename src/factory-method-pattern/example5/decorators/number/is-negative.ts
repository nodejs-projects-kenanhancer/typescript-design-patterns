import { FieldNameType, TFieldNameFromValue } from "../../model/type";
import { BaseFieldDecorator } from "../base-field-decorator";

export class IsNegative<
  TRecord,
  TFieldName extends TFieldNameFromValue<TRecord, number>
> extends BaseFieldDecorator<TRecord, TFieldName, number> {
  execute(
    fieldName: FieldNameType<TRecord, TFieldName, number>,
    fieldValue: number
  ): number {
    if (fieldValue >= 0) {
      this.throwError(
        fieldName,
        fieldValue,
        `${fieldName} must be a negative number`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}
