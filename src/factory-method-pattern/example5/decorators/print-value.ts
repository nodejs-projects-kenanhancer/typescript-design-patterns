import { BaseFieldDecorator } from "./base-field-decorator";
import type { FieldNameType } from "../model/type";

export class PrintValue<
  TRecord,
  TFieldName extends keyof TRecord
> extends BaseFieldDecorator<TRecord, TFieldName, any> {
  execute(fieldName: FieldNameType<TRecord, TFieldName, any>, fieldValue: any) {
    console.log(`${fieldName} is ${fieldValue}`);

    return super.execute(fieldName, fieldValue);
  }
}
