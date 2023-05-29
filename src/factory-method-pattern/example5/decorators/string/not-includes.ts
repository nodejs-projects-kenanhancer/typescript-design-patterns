import type { FieldNameType } from "../../model/type";
import { BaseFieldDecorator } from "../base-field-decorator";

export class NotIncludes<
  TRecord,
  TFieldName extends keyof TRecord
> extends BaseFieldDecorator<TRecord, TFieldName, string> {
  private readonly searchValue: string;
  private readonly position?: number;

  constructor(
    searchValue: string,
    position?: number,
    nextFieldDecorator?: BaseFieldDecorator<TRecord, TFieldName, string>
  ) {
    super(nextFieldDecorator);

    this.searchValue = searchValue;
    this.position = position;
  }

  execute(
    fieldName: FieldNameType<TRecord, TFieldName, string>,
    fieldValue: string
  ): string {
    if (fieldValue.includes(this.searchValue, this.position)) {
      throw new Error(
        `${fieldName} should not include a ${this.searchValue} string`
      );
    }

    return super.execute(fieldName, fieldValue);
  }
}
