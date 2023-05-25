export type FieldNameType<
  TRecord,
  TFieldName extends keyof TRecord,
  TFieldValue = never
> = TFieldName extends any
  ? TRecord[TFieldName] extends TFieldValue
    ? Extract<TFieldName, string>
    : never
  : never;

export type TFieldNameFromValue<
  TRecord,
  TFieldValue,
  TFieldName extends keyof TRecord = keyof TRecord
> = TFieldName extends any
  ? TRecord[TFieldName] extends TFieldValue
    ? TFieldName & string
    : never
  : never;

export interface FieldDecorator<
  TRecord,
  TFieldName extends keyof TRecord,
  TFieldValue = TRecord[TFieldName]
> {
  execute(
    fieldName: FieldNameType<TRecord, TFieldName, TFieldValue>,
    fieldValue: TFieldValue
  ): TFieldValue;
}

// export type DTOValidatorType<T> = {
//   readonly [P in keyof T as `${Extract<P, string>}Validator`]: FieldDecorator<
//     T,
//     P,
//     T[P]
//   >;
// } & { validate(data: T): void };
