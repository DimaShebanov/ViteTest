import { Destroy, StateListener } from "zustand/vanilla";

export type Subscribers<TComputed, TState> = {
  [TKey in keyof TComputed]: Array<keyof TState>;
};

export type Computed<TComputed, TState> = {
  [TKey in keyof TComputed]: (stateBag: { state: TState }) => TComputed[TKey];
};

export type CustomSetState<TState> = (
  partial: Partial<TState> | ((state: TState) => Partial<TState>),
  replace?: boolean
) => void;

export type CustomGetState<TState> = () => TState;

export type CustomSubscribe<TState> = {
  (listener: StateListener<TState>): () => void;
};

export type CustomStoreApi<TState, TComputed> = {
  setState: CustomSetState<TState>;
  getState: CustomGetState<TState & TComputed>;
  subscribe: CustomSubscribe<TState & TComputed>;
  destroy: Destroy;
};

export type CustomStateCreator<TState, TComputed = unknown> = (
  set: CustomSetState<TState>,
  get: CustomGetState<TState & TComputed>,
  api: CustomStoreApi<TState, TComputed>
) => TState;

/* StateCreator<
  TState & TComputed,
  CustomSetState<TState & TComputed>,
  GetState<TState & TComputed>
>; */
