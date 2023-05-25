import type {
  FieldDecorator,
  FieldNameType,
  ValidationOptions,
} from "../model/type";

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
  private readonly validationOptions?: ValidationOptions<
    TFieldName,
    TFieldValue
  >;

  constructor(
    nextFieldDecorator?: FieldDecorator<TRecord, TFieldName, TFieldValue>,
    validationOptions?: ValidationOptions<TFieldName, TFieldValue>
  ) {
    this.nextFieldDecorator = nextFieldDecorator;
    this.validationOptions = validationOptions;
  }

  protected throwError(
    fieldName: FieldNameType<TRecord, TFieldName, TFieldValue>,
    fieldValue: TFieldValue,
    defaultErrorMessage?: string
  ): void {
    if (this.validationOptions && this.validationOptions.message) {
      let message: string;

      if (typeof this.validationOptions.message === "string") {
        message = this.validationOptions.message;
      } else {
        message = this.validationOptions.message({
          fieldName,
          fieldValue,
        });
      }
    } else if (defaultErrorMessage) {
      throw new Error(defaultErrorMessage);
    }
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
