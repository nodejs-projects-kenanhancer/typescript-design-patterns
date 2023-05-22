import { BaseFieldDecorator } from "./base-field-decorator";
import { FieldNameType } from "./field-decorator";

export class PrintValue<
  TRecord,
  TFieldName extends keyof TRecord
> extends BaseFieldDecorator<TRecord, TFieldName, any> {
  execute(fieldName: FieldNameType<TRecord, TFieldName, any>, fieldValue: any) {
    console.log(`${fieldName} is ${fieldValue}`);

    return super.execute(fieldName, fieldValue);
  }
}
