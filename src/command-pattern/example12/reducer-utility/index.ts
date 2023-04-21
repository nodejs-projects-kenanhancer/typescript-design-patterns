export type Dispatch<A> = (value: A) => void;

export type Reducer<S, A> = (prevState: S, action: A) => S;

export type ReducerState<R extends Reducer<any, any>> = R extends Reducer<
  infer S,
  any
>
  ? S
  : never;

export type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<
  any,
  infer A
>
  ? A
  : never;

export function useReducer<R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>] {
  let state: ReducerState<R> = initialState;

  const dispatch: Dispatch<ReducerAction<R>> = (action) =>
    Object.assign(state, reducer(state, action));

  return [state, dispatch];
}
