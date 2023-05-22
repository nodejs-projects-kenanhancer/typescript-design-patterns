export type FieldNameType<
  TRecord,
  TFieldName extends keyof TRecord,
  TFieldValue = never
> = TFieldName extends any
  ? TRecord[TFieldName] extends TFieldValue
    ? Extract<TFieldName, string>
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

export type ValidatorRecord<T> = {
  readonly [P in keyof T]: FieldDecorator<T, P, T[P]>;
};

export type ValidatorType<T> = {
  readonly validators?: ValidatorRecord<T>;

  validate(data: T): void;
};

// export type ValidatorType<T> = {
//   readonly [P in keyof T as `${Extract<P, string>}Validator`]: FieldDecorator<
//     T,
//     P,
//     T[P]
//   >;
// } & { validate(data: T): void };
