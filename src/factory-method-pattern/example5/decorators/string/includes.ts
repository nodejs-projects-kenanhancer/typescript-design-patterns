import type { FieldNameType, ValidationOptions } from "../../model/type";
import { BaseFieldDecorator } from "../base-field-decorator";

export class Includes<
  TRecord,
  TFieldName extends keyof TRecord
> extends BaseFieldDecorator<TRecord, TFieldName, string> {
  private readonly searchValue: string;
  private readonly position?: number;

  constructor(
    searchValue: string,
    position?: number,
    nextFieldDecorator?: BaseFieldDecorator<TRecord, TFieldName, string>,
    validationOptions?: ValidationOptions<TFieldName, string>
  ) {
    super(nextFieldDecorator, validationOptions);

    this.searchValue = searchValue;
    this.position = position;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, string>,
    fieldValue: string
  ): string {
    if (!fieldValue.includes(this.searchValue, this.position)) {
      this.throwError(
        fieldName,
        fieldValue,
        `${fieldName} must include a ${this.searchValue} string`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}
