import { BaseFieldDecorator } from "./base-field-decorator";

export class NoValidation<
  TRecord,
  TFieldName extends keyof TRecord
> extends BaseFieldDecorator<TRecord, TFieldName, any> {}
