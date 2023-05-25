import type { FieldNameType } from "../model/type";
import { BaseFieldDecorator } from "./base-field-decorator";

export class Pipe<
  TRecord,
  TFieldName extends keyof TRecord,
  TValue
> extends BaseFieldDecorator<TRecord, TFieldName, TValue> {
  private readonly fieldDecorators: BaseFieldDecorator<
    TRecord,
    TFieldName,
    TValue
  >[];

  constructor(
    ...fieldDecorators: BaseFieldDecorator<TRecord, TFieldName, TValue>[]
  ) {
    super();

    this.fieldDecorators = fieldDecorators;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, TValue>,
    fieldValue: TValue
  ): TValue {
    let result: TValue;
    for (const fieldDecorator of this.fieldDecorators) {
      result = fieldDecorator.execute(fieldName, fieldValue);
    }

    return result!;
  }
}
