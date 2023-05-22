import { FieldDecorator, FieldNameType } from "./field-decorator";

export abstract class BaseFieldDecorator<
  TRecord,
  TFieldName extends keyof TRecord,
  TFieldValue
> implements FieldDecorator<TRecord, TFieldName, TFieldValue>
{
  private readonly nextFieldDecorator?: FieldDecorator<
    TRecord,
    TFieldName,
    TFieldValue
  >;

  constructor(
    nextFieldDecorator?: FieldDecorator<TRecord, TFieldName, TFieldValue>
  ) {
    this.nextFieldDecorator = nextFieldDecorator;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, TFieldValue>,
    fieldValue: TFieldValue
  ): TFieldValue {
    if (this.nextFieldDecorator) {
      return this.nextFieldDecorator.execute(fieldName, fieldValue);
    }

    return fieldValue;
  }
}
